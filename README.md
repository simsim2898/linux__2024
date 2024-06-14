# 데이터 베이스 설명 

## 1. Members 테이블:

- MemberID: 회원의 고유 ID (Primary Key)
- Name: 회원 이름
- Password: 회원 비밀번호
- PhoneNumber: 회원 전화번호
- Nickname: 회원 닉네임
- Email: 회원 이메일


## 2. Posts 테이블:

- PostID: 게시물의 고유 ID (Primary Key)
- MemberID: 작성자 회원의 ID (Foreign Key, Members 테이블의 MemberID를 참조)
- Title: 게시물 제목
- Content: 게시물 내용
- CreatedDate: 게시물 작성 날짜

## 3. Comments 테이블:

- CommentID: 댓글의 고유 ID (Primary Key)
- PostID: 댓글이 달린 게시물의 ID (Foreign Key, Posts 테이블의 PostID를 참조)
- MemberID: 댓글 작성자 회원의 ID (Foreign Key, Members 테이블의 MemberID를 참조)
- Content: 댓글 내용
- CreatedDate: 댓글 작성 날짜

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

## 환경
# Ubuntu 24.04 LTS
윈도우에서 사용가능한 리눅스 사용
# sqlite3
데이터베이스 구동에 사용
# node.js 
 서버 구동에 사용
# visual studio Code 의 WSL 확장자 
LTS의 경우 GUI를 지원하지 않아 코드 작성할떄 있어 수업시간에 배운 gedit을 사용할수 없어 nano를 사용해야 했지만 
WSL를 사용함으로써 GUI를 지원하지 않는 리눅스 상황에서 visual studio code를 켜서 코드를 작성할수 있어 코드 수정 및 작성에 있어서 편의성을 가지고 코드를 작성하였음 
 ## 시도 해본것
 # centos08
 시도결과 SQL 사용할때 적용해서 오류가 떠서 실패함
 # MYSQL
 사용 해보았으나 설치애는 문제가 안되지만 데이터베이스 연도엥서 문제가됨
 # apache
 node.js가 아닌 사용 처음 접근시 PHP로 코드를 작성하였을때 SQL에서 문제가 생겨서 javascript로 코드를 작성하게 되면서 node.js로 변경하였습니다. 

