import "./messenger.css";
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/conversations/Conversations";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/Chatonline/Chatonline";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
// const User = "6487229bfdbf53620b2ea8c2"; // user đang dk cho cố định để test. Sau này sẽ lấy theo user
// // đang login vào ứng dụng.

export default function Messenger() {
  const User = useContext(AuthContext).user._id;
  // state phục vụ cho hiển thị mess box
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState();

  const [onlineUsers, setOnlineUsers] = useState([]);

  // state phục vụ up messagge mới
  const [newMessage, setNewMessage] = useState("");

  // state to scroll
  const scrollRef = useRef();

  //state phục vụ cho socket lưu trữ socket sau mỗi lan truy cập dưới dạng biến ngoài luồng.
  const socket = useRef();
  useEffect(() => {
    //get message chỉ chạy 1 lần duy khi load component
    socket.current = io("http://localhost:7000");
    socket.current.on("getMessage", ({ senderId, text }) => {
      setArrivalMessage({
        sender: senderId,
        text: text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    console.log("socket in  ra", arrivalMessage);

    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) // chỉ render hien len neu ng dung dang o trang thai online trong đoạn hội thoại
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", User);

    socket.current.on("getAllUserOnline", (arr) => {
      const arrOthers = arr.filter((arrOther) => arrOther.userId !== User);
      return setOnlineUsers([...arrOthers]);
    });
  }, [User]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversation/" + User);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [User]);

  useEffect(() => {
    // gan message cac array da dk fetch ra tu api array.
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: User,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const response = await axios.post("/api/message", message);
      setMessages([...messages, message]);
    } catch (error) {
      console.log(error);
    }

    if (currentChat && User) {
      const recevierId = currentChat.members.find((mem) => {
        return mem !== User;
      });
      socket.current.emit("sendMessage", {
        senderId: User,
        receiverId: recevierId,
        text: newMessage,
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={User} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          {currentChat ? (
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === User} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onBlur={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <p>Click conversation to show chatbox</p>
          )}
        </div>
        <div className="chatOnline">
          {console.log(onlineUsers)}
          {onlineUsers.map((onlineU) => (
            <ChatOnline key={onlineU.userId} user={onlineU} />
          ))}
        </div>
      </div>
    </>
  );
}
