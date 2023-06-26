import express from "express";
import Message from "../models/Message.js";
const router = express.Router();

// create a newMessage
router.post("/", async (req, res) => {
  try {
    const newMessage = await new Message(req.body);
    await newMessage.save();
    res.status(200).json("create a message thanh cong ");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all Message in a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const allMessage = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(allMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
