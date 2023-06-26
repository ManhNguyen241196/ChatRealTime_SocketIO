import "./App.css";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Profile from "./Page/Profile";
import Register from "./Page/Register";
import * as React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Messenger from "./Page/messenger/Messenger";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = React.useContext(AuthContext);
  console.log("app in ra", user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile/:username", //can phair sua src cua tat ca img lien quan toi profile (theem / vao truoc asset vi yeu to duong link)
      element: <Profile />,
    },
    {
      path: "/messenger", //can phair sua src cua tat ca img lien quan toi profile (theem / vao truoc asset vi yeu to duong link)
      element: <Messenger />,
    },
  ]);

  return (
    <div className="App">
      {/* <React.StrictMode> */}
      <RouterProvider router={router} />
      {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
