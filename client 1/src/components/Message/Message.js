import "./message.css";
import moment from "moment/moment";
export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {" "}
        <h3>{message.sender}</h3>
        {/* <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> */}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {moment(message.createdAt).endOf("day").fromNow()}{" "}
      </div>
    </div>
  );
}
