const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

let count = 0

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 更新计数
app.get("/api/inc", async (req, res) => {
  res.send({
    code: 0,
    data: ++count,
  });
});

app.get("/api/clear", async (req, res) => {
  count = 0
  res.send({
    code: 0,
    data: count,
  });
});

// 获取计数
app.get("/api/count", async (req, res) => {
  res.send({
    code: 0,
    data: count,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const port = 8080;

async function bootstrap() {
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
