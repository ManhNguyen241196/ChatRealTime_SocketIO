// phan này sẽ bao gồm các mehtod để thực hiện các tương gtasc với profile của 1
//user gồm update, lấy ra user đó, xóa tài khoản, follow haowjc hủy follow với user/
import express from "express";
import bcrypt from "bcryptjs";
import UserFactory from "../models/User.js";

const router = express.Router();
var salt_user = bcrypt.genSaltSync(10);
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    // nếu trong req gửi lên có chứa id trùng với id trên router thì mới cho update
    if (req.body.password) {
      // neeus trong phan object mà req gui len server có chứa password
      // thì sẽ tiến hành hashed password mới đó và thay thế nó vào vị trí của chính nó.
      try {
        const hashedPassword = bcrypt.hashSync(req.body.password, salt_user);
        req.body.password = hashedPassword;
      } catch (error) {
        return res.status(500).json(error);
      }

      try {
        const user = await UserFactory.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { returnOriginal: false }
        );

        res.status(200).json("update thanh cong");
      } catch (error) {
        return res.status(500).json("co loi");
      }
    }
  } else {
    return res.status(403).json("ban chi co the update tai khoan cua minh");
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    const User = await UserFactory.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json("da xoa thanh cong");
  } catch (error) {
    console.log(error);
    return res.status(500).json("co loi");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const User = await UserFactory.findById(req.params.id);
    const { password, updatedAt, ...other } = User._doc;
    return res.status(200).json(other);
  } catch (error) {
    console.log(error);
    return res.status(500).json("co loi");
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    if (req.params.userId) {
      const getUser = await UserFactory.findById(req.params.userId);
      const friends = await Promise.all(
        getUser.followings.map((friendId) => {
          return UserFactory.findById(friendId);
        })
      );
      const newFriends = [];
      if (friends.length > 0) {
        friends.map((friend) => {
          const { _id, username, profilePicture } = friend;
          newFriends.push({ _id, username, profilePicture });
        });
        return res.status(200).json(newFriends);
      } else {
        return res.status(200).json("ban chua follow bat ki ai");
      }
    }
  } catch (error) {
    return res.status(500).json("co loi");
  }
});

//follow a user
router.post("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    // điều kiện để user k tự follow chính họ
    let userFollower = await UserFactory.findById(req.body.userId);
    let userFollowing = await UserFactory.findById(req.params.id);

    if (!userFollowing.followers.includes(req.body.userId)) {
      const ArrPushFollowing = await userFollower.updateOne({
        followings: [...userFollower.followings, req.params.id],
      });
      const ArrPushFollower = await userFollowing.updateOne({
        followers: [...userFollowing.followers, req.body.userId],
      });
      return res.status(200).json("Chuc mung!!! Ban da follow thanh cong");
    } else {
      return res.status(403).json("Ban da follow ng nay");
    }
  }
  return res.status(403).json("Error! Bạn không thể follow chính mình");
});

//unfollow user
router.post("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    let userFollower = await UserFactory.findById(req.body.userId);
    let userFollowing = await UserFactory.findById(req.params.id);
    if (userFollowing.followers.includes(req.body.userId)) {
      const removeFollowing = userFollower.followings.filter((id) => {
        return id !== req.params.id;
      });
      const removeFollower = userFollowing.followers.filter((id) => {
        return id !== req.body.userId;
      });

      const ArrPushFollowing = await userFollower.updateOne({
        followings: [...removeFollowing],
      });
      const ArrPushFollower = await userFollowing.updateOne({
        followers: [...removeFollower],
      });
      return res.status(200).json("Ban da unfollow thanh cong");
    } else {
      return res.status(403).json("Error!!! Ban chua follow nguoi nay");
    }
  } else {
    return res.status(403).json("Error! Bạn không thể unfollow chính mình");
  }
});

export default router;
