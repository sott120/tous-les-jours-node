var app = require('../app.js'); //app,js에 있는 내용 실행
var port = 3000; //3000번 포트 실행

app.listen(port, () => { //서버 실행
    console.log(`express 실행 ${port}`) //서버가 실행됐을 때 console창에 나타남
})