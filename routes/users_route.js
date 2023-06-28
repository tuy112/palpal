// routes>users_route.js

const express = require("express");
const router = express.Router();

// Middleware
const authMiddleware = require("../middlewares/auth-middleware.js");
// JWT
const jwt = require("jsonwebtoken")
// Model
const { Users, UserInfos } = require("../models")

// 회원가입 API (POST)
router
  .post("/signup", async (req, res) => {
    const { email, nickname, password, confirm } = req.body;
    const existUserEmail = await Users.findOne({ where: { email } });
    const exitsUserNickname = await UserInfos.findOne({ where: { nickname } })

    try {
      if (!email) {
        return res.status(412).json({ message: "email의 형식이 올바르지 않습니다." })
      }
      if (existUserEmail) {
        return res.status(412).json({ message: "중복된 email입니다." })
      }
      if (!nickname || nickname.length < 3 || !/^[a-z A-Z 0-9]+$/.test(nickname)) {
        // 3번째 조건은 정규 표현식이며, '^'은 문자열 시작, '$'은 문자열 끝을 나타냅니다.
        // test() method는 이 정규 표현식을 'nickname' 문자열에 적용하여, 앞에 조건이 일치하는지 여부를 반환합니다.
        return res.status(412).json({ message: "nickname의 형식이 올바르지 않습니다." })
      }
      if (password !== confirm) {
        return res.status(412).json({ message: "password가 일치하지 않습니다." })
      }
      if (!password || password.length < 4 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(password)) {
        // 3번째 조건은, 비밀번호가 영어 소문자, 대문자, 숫자를 각각 최소 1개 이상 포함해야 함을 나타냅니다.
        return res.status(412).json({ message: "password 형식이 올바르지 않습니다." })
      }
      if (password.includes(nickname)) {
        return res.status(412).json({ message: "password에 nickname이 포함되어 있습니다." })
      }
      if (exitsUserNickname) {
        return res.status(412).json({ message: "중복된 nickname입니다." });
      }
      // Users(table), UserInfos(table)에 사용자 정보를 추가합니다.
      const user = await Users.create({ email, password });
      const userInfo = await UserInfos.create({
        userId: user.userId,
        email: email,
        nickname: nickname,
        password: password,
        userDesc: null
      });
      return res.status(201).json({ message: "회원 가입에 성공하였습니다." });
      // try => catch
    } catch {
      return res.status(400).json({ message: "요청한 Data 형식이 올바르지 않습니다." });
    }
  })

// log-in API (POST)
router
  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    const existUser = await Users.findOne({ where: { email } });
    try {
      if (!existUser || password !== existUser.password) {
        return res.status(412).json({ message: "email 또는 password를 확인해주세요." });
      }

      // JWT 생성
      const token = jwt.sign({
        userId: existUser.userId
      }, "customized_secret_key"); // Secret Key => customized_secret_key

      // Cookie 발급
      res.cookie("authorization", `Bearer ${token}`);

      return res.status(200).json({ "token": token });
      // try => catch
    } catch {
      return res.status(400).json({ message: "log-in에 실패하였습니다." });
    }
  })

// 사용자 정보 조회 API (GET)
router.get("/users/:userId", authMiddleware, async (req, res) => {
  const paramsUserId = req.params.userId; // from params, type: string
  const { userId } = res.locals.user; // from authMiddleware, type: number
  console.log(paramsUserId, userId)
  console.log(typeof paramsUserId, typeof userId)

  try {
    if (paramsUserId !== String(userId)) {
      return res.status(403).json({ message: "권한이 존재하지 않습니다." });
    } else if (paramsUserId === String(userId)) {
      const user = await Users.findOne({
        attributes: ["userId", "email", "createdAt", "updatedAt"],
        include: [
          {
            model: UserInfos,  // 1:1 관계를 맺고있는 UserInfos 테이블을 조회합니다.
            attributes: ["nickname", "userDesc"],
          }
        ],
        where: { userId: paramsUserId }
      });

      return res.status(200).json({ data: user });
    }
    // try => catch
  } catch {
    return res.status(400).json({ message: "사용자 정보 조회에 실패하였습니다." });
  }
});

module.exports = router;
