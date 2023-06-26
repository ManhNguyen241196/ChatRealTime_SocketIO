//phần auth sẽ chỉ sử dụng 2 thuộc tính cơ bản nhất là creat data và get 1 data từ 1 điều kiện cho trước.

import express from "express";
import UserFactory from "../models/User.js";
//import hash password
import bcrypt from "bcryptjs";

const router = express.Router();
var salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {
  try {
    //hash password để mã hóa pass
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = await new UserFactory({
      // phần này cũn pahir dùng async await vì nó giao tiếp với method và dữ liệu
      // databasse ở trên server
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save(); // bat buoc phair cos .save() để lưu dữ liệu lên database
    res.status(200).json("create user thanh cong ");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserFactory.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    console.log(validPass);
    if (!validPass) {
      return res.status(404).json("Sai email hoac pass");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
