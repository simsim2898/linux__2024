# 데이터 베이스 설명 

## 1. Members 테이블:

MemberID: 회원의 고유 ID (Primary Key)
Name: 회원 이름
Password: 회원 비밀번호
PhoneNumber: 회원 전화번호
Nickname: 회원 닉네임
Email: 회원 이메일


## 2. Posts 테이블:

PostID: 게시물의 고유 ID (Primary Key)
MemberID: 작성자 회원의 ID (Foreign Key, Members 테이블의 MemberID를 참조)
Title: 게시물 제목
Content: 게시물 내용
CreatedDate: 게시물 작성 날짜

## 3. Comments 테이블:

CommentID: 댓글의 고유 ID (Primary Key)
PostID: 댓글이 달린 게시물의 ID (Foreign Key, Posts 테이블의 PostID를 참조)
MemberID: 댓글 작성자 회원의 ID (Foreign Key, Members 테이블의 MemberID를 참조)
Content: 댓글 내용
CreatedDate: 댓글 작성 날짜

# 디렉토리 구조

/project-linux
│
├── /public
│   ├── main.html
│   ├── register.html
│   ├── login.html
│   ├── forum.html
│   ├── main.js
│
├── app.js
├── package.json
├── package-lock.json
├── /db
│   ├── database.sqlite