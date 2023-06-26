import "./home.css";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Rightbar from "../components/Rightbar/Rightbar";
import Feed from "../components/Feed/Feed";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <>
          <Topbar />
          <div className="homeContainer">
            <Sidebar />
            <Feed />
            <Rightbar />
          </div>
        </>
      )}
    </>
  );
}
