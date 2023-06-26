import "./post.css";
import { ThreeDotsVertical } from "react-bootstrap-icons";
// import { Users } from "../../dummyData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Post({ post }) {
  const [users, setusers] = useState([]);

  // tạo hiệu ứng like
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const user = await axios.get("/api/user/" + post.userId);
        setusers(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataUser();
  }, [post.userId]);

  const likeHandler = () => {
    console.log("this is likeHandler function ");
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={users.profilePicture || "/assets/person/noAvata.jpg"}
              alt=""
            />
            <span className="postUsername">{users.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <ThreeDotsVertical />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
