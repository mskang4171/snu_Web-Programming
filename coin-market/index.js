const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { encryptPassword } = require("./utils");
const { body, validationResult } = require("express-validator");

const { User } = require("./models/User");
const { Coin } = require("./models/Coin");
const { Asset } = require("./models/Asset");

mongoose.connect(
  "mongodb+srv://<User Name>:<password>@<Cluster Name>.<a1b2c>.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(express.urlencoded({ extended: true }));

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const [bearer, key] = authorization.split(" ");
  if (bearer !== "Bearer") return res.sendStatus(401);
  const user = await User.findOne({ key });
  if (!user) return res.sendStatus(401);

  req.user = user;
  next();
};

// 회원가입 명령이 오면 User를 만들어주기
/*
    name: string 4~8글자
    email: string 100자 이내의 sdfaf@naver.com
    password: string 30자 이내의 영어 대문자포함 ~
*/
app.post(
  "/signup",
  [
    body("name").isLength({ min: 3, max: 20 }),
    body("email").isEmail(),
    body("password").isLength({ min: 10, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ errors: { email: "Already registered" } });
    }

    const encryptedPassword = encryptPassword(password);
    const user = new User({ email, name, password: encryptedPassword });
    await user.save();

    const coin = await Coin.findOne({ code: "usd" });
    const asset = new Asset({ user, coin, quantity: 100000 });
    await asset.save();

    return res.sendStatus(200);
  }
);
// 4xx => client error

// 로그인 명령이 들어오면, valid한지 체크를 한 후에, key를 발급해준다.
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: encryptPassword(password),
  });

  if (!user) return res.sendStatus(404);

  const key = crypto.randomBytes(24).toString("hex");
  user.key = key;
  await user.save();
  res.send({ key });
});

app.get("/coins", async (req, res) => {
  const coins = await Coin.find();
  res.send(coins);
});

app.get("/assets", async (req, res) => {
  const coins = await Coin.find();
  res.send(coins);
});

app.post("coins/:code/buy", async (req, res) => {});

app.post("coins/:code/sell", async (req, res) => {});

app.listen(3000);
/*

email, password => key 

key를 request보낼 때 같이 보내서 본인임을 인증.

*/
