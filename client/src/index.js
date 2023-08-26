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
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
