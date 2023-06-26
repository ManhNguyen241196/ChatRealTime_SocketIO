// collection conversation  với các method là tạo mới và get các method chỉ để cung cấp các array chứa các id của user tham gia cuojc hội thoại đó.
import express from "express";

import Conversation from "../models/Conversation.js";

const router = express.Router();

// create a Conversation
router.post("/", async (req, res) => {
  try {
    const newConversation = await new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    await newConversation.save();
    res.status(200).json("create conversation thanh cong ");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conversation a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
