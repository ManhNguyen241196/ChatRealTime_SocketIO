import express from "express";
import mongoose from "mongoose"; // hỗ trợ việc kết nối với mongoDb . Nó giống kiểu mysql2 để setup connect với mySQL
import dotenv from "dotenv"; // để lấy các thông tin từ file .env để setup môi trường
import helmet from "helmet"; // 1 middle ware hỗ trợ bảo mật hơn khi gửi request
import morgan from "morgan"; // cung cấp bản ghi tự động tất cả các  request towis server.

//import module route
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import conversationsRoute from "./routes/conversations.js";
import messageRoute from "./routes/messages.js";

const app = express();

dotenv.config();

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
const db = mongoose.connect(process.env.MONGO_URL, options).then(
  () => {
    console.log("da connected with database");
  },
  (err) => {
    console.log(err);
  }
);
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationsRoute);
app.use("/api/message", messageRoute);

app.listen(8800, (error) => {
  if (!error) console.log("Server is Successfully Running 8800 PORT");
  else console.log("Error occurred, server can't start", error);
});
