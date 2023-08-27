import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Register from "./Component/Register";
import Login from "./Component/Login";
import ForgetPassword from "./Component/ForgetPassword";
import ResetPassword from "./Component/ResetPassword";
import Blog from "./Component/Blog";
import Jonseek from "./Component/Jobseek";
import Post from "./Component/Post";
import JobApply from "./Component/JobApply";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={App}/>
      <Route path="/home" Component={Home}/>
      <Route path="/register" Component = {Register} />
      <Route path="/login" Component={Login}/>
      <Route path="/forgetPassword" Component={ForgetPassword}/>
      <Route path="/resetPassword" Component={ResetPassword}/>
      <Route path="/blog" Component={Blog}/>
      <Route path="/apply" Component={Jonseek}/>
      <Route path="/postjob" Component={Post}/>
      <Route path="/applyform" Component={JobApply}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
