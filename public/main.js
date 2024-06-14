function register() {
    const form = document.getElementById('registerForm');
    const data = new URLSearchParams(new FormData(form));
    fetch('/register', {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.ok) {
            window.location.href = '/login.html';
        } else {
            alert("회원가입 실패");
        }
    });
}

function login() {
    const form = document.getElementById('loginForm');
    const data = new URLSearchParams(new FormData(form));
    fetch('/login', {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.ok) {
            window.location.href = '/forum.html';
        } else {
            alert("로그인 실패");
        }
    });
}

function logout() {
    fetch('/logout', {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            window.location.href = '/';
        } else {
            alert("로그아웃 실패");
        }
    });
}

function createPost() {
    const form = document.getElementById('postForm');
    const data = new URLSearchParams(new FormData(form));
    fetch('/createPost', {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.ok) {
            window.location.href = '/forum.html';
        } else {
            alert("게시물 작성 실패");
        }
    });
}

function createComment() {
    const postId = new URLSearchParams(window.location.search).get('postId');
    const form = document.getElementById('commentForm');
    const data = new URLSearchParams(new FormData(form));
    data.append('postId', postId);
    fetch('/createComment', {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.ok) {
            window.location.reload();
        } else {
            alert("댓글 작성 실패");
        }
    }).catch(err => console.error('Error:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    const postId = new URLSearchParams(window.location.search).get('postId');
    if (postId) {
        fetch(`/post/${postId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('post-title').innerText = data.title;
                document.getElementById('post-content').innerText = data.content;
                const commentsDiv = document.getElementById('comments');
                commentsDiv.innerHTML = ''; // Clear previous comments
                data.comments.forEach(comment => {
                    const p = document.createElement('p');
                    p.innerText = comment.content;
                    commentsDiv.appendChild(p);
                });
            }).catch(err => console.error('Error:', err));
    } else if (window.location.pathname === '/forum.html') {
        fetch('/posts')
            .then(response => response.json())
            .then(posts => {
                const postsDiv = document.getElementById('posts');
                postsDiv.innerHTML = ''; // Clear previous posts
                posts.forEach(post => {
                    const postLink = document.createElement('a');
                    postLink.href = `post.html?postId=${post.postId}`;
                    postLink.innerText = post.title;
                    postsDiv.appendChild(postLink);
                    postsDiv.appendChild(document.createElement('br'));
                });
            }).catch(err => console.error('Error:', err));
    }
});
