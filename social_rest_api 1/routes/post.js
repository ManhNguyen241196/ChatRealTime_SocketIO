// tất cả các method sử dụng đẻ tương tác với post
import express from "express";
import Post from "../models/Post.js";
import UserFactory from "../models/User.js";
const router = express.Router();

// create a post
router.post("/", async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    await newPost.save();
    res.status(200).json("create post thanh cong ");
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  // update towis 1 post cụ thể nên phải trỏ tới id
  try {
    const findPost = await Post.findById(req.params.id);
    if (findPost.userId === req.body.userId) {
      console.log(findPost.userId, req.body.userId);
      // điều kiện để chạy được update là thông tin
      // đưa lên update có chứa id trùng với id của ng post chính bài đó trong csdl.
      //thay vì xét trong cookies để gửi lên cùng header thì ở đây nó được gán vào luôn trong body mà req post lên.
      // mọi request được gửi lên server đều có chứa thêm 1 key userId để xác thực.
      const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        returnOriginal: false,
      });
      res.status(200).json("update thanh cong post");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      const arrPush = post.likes;
      await post.updateOne({ likes: [...arrPush, req.body.userId] });
      res.status(200).json("The post has been liked");
    } else {
      const arrPull = post.likes;
      const arrRemove = arrPull.splice(arrPull.indexOf(req.body.userId), 1);
      await post.updateOne({ likes: [...arrPull] });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await UserFactory.findById(req.params.userId);
    const arrayMer = [...user.followings, req.params.userId];
    let AllPosts = await Promise.all(
      arrayMer.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    AllPosts = Array.prototype.concat.apply([], AllPosts);

    res.status(200).json(AllPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await UserFactory.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
