const express = require("express");
const app = express();

const server = app.listen(8080, () => {
  console.log("Start Server : localhost:8080");
});

const db = require("database/data");
db.connect();

var getprofile = async function (req, res) {
  const nickname = req.params;

  try {
    const [profile] = await db.promise();
    res.json(profile);
  } catch {
    console.log("getprofile got error");
    res.status(400).json({ text: "ErrorCode:400, Bad Request" });
  }
};

var getmatches = async function (req, res) {
  const nickname = req.params;

  try {
    const [matches] = await db.promise();
    res.json(matches);
  } catch {
    console.log("getmatchs got error");
    res.status(400).json({ text: "ErrorCode:400, Bad Request" });
  }
};

var getmatchdetail = async function (req, res) {
  const nickname = req.params;

  try {
    const [matches] = await db.promise();
    res.json(matches);
  } catch {
    console.log("getmatchdetail got error");
    res.status(400).json({ text: "ErrorCode:400, Bad Request" });
  }
};

app.get("/profile/:nickname", getprofile);
app.get("/matches/:nickname", getmatches);
app.get("/matches/detail/:nickname", getmatchdetail);
