import { useEffect, useState } from "react";
import "./conversations.css";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const recieveId = conversation.members.find((member) => {
      return member !== currentUser;
    });

    const getUser = async (req, res) => {
      try {
        const userRecieve = await axios.get("/api/user/" + recieveId);
        setUser(userRecieve.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation.members]);

  return (
    <div className="conversation">
      {user ? (
        <>
          <img
            className="conversationImg"
            src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg"
            alt=""
          />
          <span className="conversationName">{user.username}</span>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
