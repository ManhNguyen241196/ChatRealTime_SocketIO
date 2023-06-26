import Post from "../Post/Post";
import Share from "../Share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed() {
  const userID = "6487229bfdbf53620b2ea8c2";
  const [Posts, setpost] = useState([]);

  useEffect(() => {
    const fetchDataPost = async (userID) => {
      try {
        const post = await axios.get("/api/post/timeline/" + userID);
        console.log(post.data);
        setpost(post.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataPost(userID);
  }, [userID]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {console.log(Posts)}
        {Posts.length > 0 ? (
          Posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
