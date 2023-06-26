import { useEffect, useState } from "react";
import "./chatonline.css";
import axios from "axios";
export default function ChatOnline({ user }) {
  const [userOnline, setUserOnline] = useState(null);

  useEffect(() => {
    const getUserOnline = async () => {
      try {
        const res = await axios.get("/api/user/" + user.userId);
        setUserOnline(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserOnline();
  }, [user]);

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">
          {userOnline && userOnline.username}
        </span>
      </div>
    </div>
  );
}
