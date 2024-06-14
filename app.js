const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const db = new sqlite3.Database('./db/database.sqlite');

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// 테이블 생성 (존재하지 않는 경우)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Members (
        MemberID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Password TEXT NOT NULL,
        PhoneNumber TEXT NOT NULL,
        Nickname TEXT NOT NULL,
        Email TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Posts (
        PostID INTEGER PRIMARY KEY AUTOINCREMENT,
        MemberID INTEGER,
        Content TEXT NOT NULL,
        Title TEXT NOT NULL,
        CreatedDate TEXT NOT NULL,
        FOREIGN KEY (MemberID) REFERENCES Members (MemberID)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Comments (
        CommentID INTEGER PRIMARY KEY AUTOINCREMENT,
        PostID INTEGER,
        MemberID INTEGER,
        Content TEXT NOT NULL,
        CreatedDate TEXT NOT NULL,
        FOREIGN KEY (PostID) REFERENCES Posts (PostID),
        FOREIGN KEY (MemberID) REFERENCES Members (MemberID)
    )`);
});

// 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/forum.html', (req, res) => {
    if (!req.session.memberId) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

app.get('/post.html', (req, res) => {
    if (!req.session.memberId) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, 'public', 'post.html'));
});

app.post('/register', (req, res) => {
    const { name, password, phone, nickname, email } = req.body;
    db.run(`INSERT INTO Members (Name, Password, PhoneNumber, Nickname, Email) VALUES (?, ?, ?, ?, ?)`, [name, password, phone, nickname, email], function (err) {
        if (err) {
            return res.status(500).send("Registration failed");
        }
        res.redirect('/login.html');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM Members WHERE Email = ? AND Password = ?`, [email, password], (err, row) => {
        if (err || !row) {
            return res.status(401).send("Login failed");
        }
        req.session.memberId = row.MemberID;
        res.redirect('/forum.html');
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Logout failed");
        }
        res.redirect('/');
    });
});

app.post('/createPost', (req, res) => {
    const { title, content } = req.body;
    const memberId = req.session.memberId;
    const createdDate = new Date().toISOString();
    db.run(`INSERT INTO Posts (MemberID, Content, Title, CreatedDate) VALUES (?, ?, ?, ?)`, [memberId, content, title, createdDate], function (err) {
        if (err) {
            return res.status(500).send("Post creation failed");
        }
        res.redirect('/forum.html');
    });
});

app.post('/createComment', (req, res) => {
    const { postId, commentContent } = req.body;
    const memberId = req.session.memberId;
    const createdDate = new Date().toISOString();
    db.run(`INSERT INTO Comments (PostID, MemberID, Content, CreatedDate) VALUES (?, ?, ?, ?)`, [postId, memberId, commentContent, createdDate], function (err) {
        if (err) {
            return res.status(500).send("Comment creation failed");
        }
        res.redirect(`/post.html?postId=${postId}`);
    });
});

app.get('/posts', (req, res) => {
    db.all(`SELECT PostID as postId, Title as title FROM Posts`, [], (err, rows) => {
        if (err) {
            return res.status(500).send("Failed to retrieve posts");
        }
        res.json(rows);
    });
});

app.get('/post/:postId', (req, res) => {
    const { postId } = req.params;
    db.get(`SELECT Title as title, Content as content FROM Posts WHERE PostID = ?`, [postId], (err, post) => {
        if (err || !post) {
            return res.status(500).send("Failed to retrieve post");
        }
        db.all(`SELECT Content as content FROM Comments WHERE PostID = ?`, [postId], (err, comments) => {
            if (err) {
                return res.status(500).send("Failed to retrieve comments");
            }
            res.json({ ...post, comments });
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
