import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String, // define loại dữ liệu có thể nhập
      require: true, // yêu cầu phải có chứ k đượ để trống
      min: 3, // tối thiểu 3 kí tự
      max: 20,
      unique: true, // chỉ là dữ liệu duy nhất chứ k có lặp lại ở 1 object khác trong toàn bộ database
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "", // mặc định của nó là chuỗi rỗng.
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [], // định nghĩa của follow ban đầu là 1 chuỗi rỗng. Nếu user (có chứa cái object này) được ai follow thì sẽ được push vào arr này
    },
    followings: {
      type: Array,
      default: [], // giống bên trên kia thì đây sẽ là arr chứa những ng mà user (của object này) đang follow
    },
    isAdmin: {
      type: Boolean,
      default: false, // nếu là true thì đó là admin và có thể có thêm các quyền admin
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
); /// thuojc tinh này do mongoose tạo ra nếu xét true thì ngoài thuojc tính được thêm bên trên nó sẽ thêm 2 thuộc tính về thời gian
// khi doc này dk tạo và khi doc này được update chỉnh sửa.
const UserFactory = mongoose.model("User", UserSchema);
export default UserFactory;
