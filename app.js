const express = require("express");
const app = express();

const server = app.listen(8080, () => {
  console.log("Start Server : localhost:8080");
});

const db = require("database/data");
db.connect();

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

var getdetail = async function (req, res) {
  const nickname = req.params;

  try {
    const [matches] = await db.promise();
    res.json(matches);
  } catch {
    console.log("getdetail got error");
    res.status(400).json({ text: "ErrorCode:400, Bad Request" });
  }
};

app.get("/matches/:nickname", getmatches);
