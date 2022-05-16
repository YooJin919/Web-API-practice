// Create Web Server
// mysql 패키지 
const mysql = require("mysql2");
// axios는 http 요청 관리하는 패키지
//const axios = require('axios');
var http = require('http');
const express = require("express");
const { resolve } = require("path");
const { rejects } = require("assert");
const { nextTick } = require("process");
const port = 3000
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

let matchList = [{
    playtime : 0,
    placement : 0,
    left_gold : 0,
    last_round : 0,
    levels : 0,
    playdate : Date,
    legends_name : '',
    unit : [{
        units_name : '',
        units_rank : 0,
        items_name1 : '',
        items_name2 : '',
        items_name3 : '',
    }],
    synergy : [{
        synergy_name : '',
        synergy_rank : 0,
    }],
    augment : [],
}];


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

var get_user_info = async function(req, res){
    let {nickname} = req.params;
    try{
        const [info] = await db
            .promise()
            .query(`SELECT * FROM user WHERE nickname='${nickname}';`);
            user.nickname = info[0].nickname;
            user.levels = info[0].levels;
            user_puuid = info[0].puuid;
        const [profile] = await db
            .promise()
            .query(`SELECT * FROM user_profile WHERE user_profile.puuid='${user_puuid}';`);
            user.icon_id = profile[0].icon_id;
        const [rank] = await db
            .promise()
            .query(`SELECT * FROM rank_tier WHERE rank_tier.puuid='${user_puuid}';`);
            rank_tier.tier = rank[0].tier;
            rank_tier.sub_tier = rank[0].sub_tier;
            rank_tier.league_point = rank[0].league_point;
            rank_tier.win = rank[0].win;
            rank_tier.defeat = rank[0].defeat;
            rank_tier.top4 = rank[0].top4;
            rank_tier.date = rank[0].date_in_tier;
        const [sf] = await db
            .promise()
            .query(`SELECT * FROM superfast_tier WHERE superfast_tier.puuid='${user_puuid}';`);
            superfast_tier.sf_tier = sf[0].sf_tier;
            superfast_tier.sf_league_point = sf[0].sf_league_point;
            superfast_tier.sf_date = sf[0].sf_date_in_tier;
        const [mch] = await db
            .promise()
            .query(`SELECT * FROM matches WHERE matches.puuid='${user_puuid}';`);
            console.log(mch);
        res.send([user, rank_tier, superfast_tier, matchList]);
    } catch(err){
        console.log('ERROR! get_user_info');
        res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
    }
}

app.get('/', function(req, res){
    console.log(req.url)
	return res.send(req.url);
});

app.get('/search/:nickname', get_user_info);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})