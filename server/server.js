// Create Web Server
// mysql 패키지 
const mysql = require('mysql');
// axios는 http 요청 관리하는 패키지
//const axios = require('axios');
var http = require('http');
const express = require("express");
const port = 3000
// .env 파일을 읽어오기 위한 패키지
require('dotenv').config();

app=express();

let user = {
    nickname : '',
    puuid : 0,
}

// DB 코드
// createConnection method를 사용하고 인자로 객체를 줌
let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: "root",
    port: "3306",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
connection.connect(); // connect method 호출하면 접속됨
console.log("mysql connection success");



// -------------------------------------------------------------------- //

app.get('/', function(req, res){
    console.log(req.url)
	return res.send(req.url);
})

app.get("/summoners/by-name/:nickname", async function(req, res){
    let { nickname } = req.params;
    console.log('req.params : '+nickname);
    res.send(nickname)
    // 1. 받은 nickname으로 DB에서 puuid 찾기
    // query메소드에서 첫번째 인자로 sql쿼리문을 주고, 두번째 인자로 callback을 줌
    // callback함수의 첫번째 인자로 error, 두번째 인자로 접속 결과를 줌
    connection.query('SELECT puuid FROM user WHERE user.nickname=nickname', function(err, results){
        if(err){
            console.log(error);
        }
            console.log(results); // topic의 데이터가 객체형태로 반환

        user.nickname = nickname;
        user.puuid = results;
    }); 
	return res.send(user_nickname);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})