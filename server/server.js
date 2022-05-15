// Create Web Server
// mysql 패키지 
const mysql = require("mysql2");
// axios는 http 요청 관리하는 패키지
//const axios = require('axios');
var http = require('http');
const express = require("express");
const { resolve } = require("path");
const { rejects } = require("assert");
// const sequelize = require('./models/index').sequelize;
const port = 3000
// sequelize.sync();
// .env 파일을 읽어오기 위한 패키지
require('dotenv').config();

app=express();

// front로 보낼 객체
let user = {
    nickname : '',
    levels : 0,
    icon_id : 0,
}
let rank_tier = {
    tier : '',
    sub_tier : '',
    league_point : 0,
    date : Date,
    win : 0,
    defeat : 0,
    top4 : 0,
}
let superfast_tier = {
    sf_date : Date,
    sf_tier : '',
    sf_league_point :0,
}
let user_puuid = '';

// DB 코드
const db = mysql.createConnection({ // createConnection method를 사용하고 인자로 객체를 줌
    host: process.env.MYSQL_HOST,
    user: "root",
    port: "3306",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    
});
console.log("mysql connection success");


// -------------------------------------------------------------------- //

app.get('/', function(req, res){
    console.log(req.url)
	return res.send(req.url);
});




async function get_user_info(req, res){
    try {
        let {nickname} = req.params;
        let sql = `SELECT * FROM user WHERE nickname='${nickname}'`;
        const re = await db.query(sql, function(err, results){
            user_puuid = results[0].puuid;
            user = {
                nickname : results[0].nickname,
                levels : results[0].levels
            }
            if(err){
                console.log(err);
            }
            else{
                console.log(results);
                //console.log('user_puuid : ', user_puuid, ' user : ', user); // topic의 데이터가 객체형태로 반환
            }
        }); 
    }
    catch(err){
        console.log(err);
    }
	return res.send(req.params);
}

app.get("/search/:nickname", get_user_info);




// app.get("/search/:nickname", async function(req, res){
//     try {
//         // 1. 받은 nickname으로 DB에서 puuid 찾기
//         // query메소드에서 첫번째 인자로 sql쿼리문을 주고, 두번째 인자로 callback을 줌
//         // callback함수의 첫번째 인자로 error, 두번째 인자로 접속 결과를 줌
//         // User Info
//         let {nickname} = req.params;
//         let sql = `SELECT * FROM user WHERE nickname='${nickname}'`;
//         const re = await db.query(sql, function(err, results){
//             user_puuid = results[0].puuid;
//             console.log(data);
//             user = {
//                 nickname : results[0].nickname,
//                 levels : results[0].levels
//             }
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(re);
//                 //console.log('user_puuid : ', user_puuid, ' user : ', user); // topic의 데이터가 객체형태로 반환
//             }
//         }); 
//     }
//     catch(err){
//         console.log(err);
//     }

// 	return res.send(req.params);
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})