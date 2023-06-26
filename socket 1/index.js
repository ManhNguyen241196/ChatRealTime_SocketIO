import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = []; // tạo mảng cho người dùng thì sẽ lưu hết tất cả những user và docket id của họ vào
// đề phòng trường hợp 1 user có nhiều socket thì cần lưu kèm tên. Các socekt từ 1 user có thể nhiều nhưng nó đều chỉ đang
//chỉ định tới 1 trang cụ thể . Khi trang đó thoát các sdocket cũng bị xóa đi theo.

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId: userId, socketId: socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => {
    return user.userId === userId;
  });
};

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getAllUserOnline", users);
    console.log(users);
  });

  // send and get mess. Nhận biến gửi từ client về chạy method tương tác với cac biến đó
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId); //Sender chính là userID. lấy ra user có Id cụ thể nào đó. đây sẽ là 1 object chứa userId và Id của socket mà user đó
    // đang truy cập
    if (user) {
      io.to(user.socketId).emit("getMessage", { senderId, text });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(users);

    console.log("online user sua khi roi di: " + socket.id);
  });
});

io.listen(7000);
