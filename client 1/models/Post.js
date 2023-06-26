import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      // userId này là id của nguoi đăng bài post đó. Sau này từ Id này khi lấy data từ post
      // sẽ đính kèm object của Id đó và xuất ra ảnh cũng như tên của user. Thay vì ghép bảng sẽ ghép
      // object của user vào. Ở đây chính user đang login vào thì vì chỉ có ng đangg login thì mới đăng dk bài post mà
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      // trong like se laf dajng 1 array  chứa các item là
      // các id của những user đã like post đó. Tương tự như trên nó cũng sẽ lấy được object bên collection user
      // rồi trishc xuất lấy các thuộc tính tương ứng.
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);
export default Post;
