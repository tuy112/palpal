const express = require('express');
const app = express();
const port = 3000;

// html css
app.use(express.static('asset'));

// 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
});

// 서버 시작!
app.listen(port, () => {
    console.log(port, '포트가 열렸습니다~^^');
});