import React, { useState, useRef } from "react";
import "./Style/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  const handleDigitChange = (index, value) => {
    if (value.match(/^\d$/) && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:8082/api/pass/resetPassword",
        { email }
      );
      if (response.data === "User Not Found! Please Register...") {
        alert("User Not Found! Please Register...");
      } else if (response.data === "Email sent successfully") {
        alert("Email sent successfully");
      } else if (
        response.data === "An error occurred while sending the email"
      ) {
        alert("An error occurred while sending the email");
      } else if (response.data === "An error occurred") {
        alert("An error occurred");
      } else {
        alert("Enter correct Email");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const userOTP = otpInputRefs.map((ref) => ref.current.value).join("");

    try {
      let response = await axios.post(
        "http://localhost:8082/api/pass/verifyOTP",
        {
          email,
          otp: userOTP,
        }
      );

      if (response.data === "OTP not found") {
        alert("Please Enter OTP");
      } else if (response.data === "OTP verified successfully") {
        alert("OTP verified successfully");
        navigate("/resetPassword", { state: { message: email } });
      } else if (response.data === "Invalid OTP") {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      <div className="image-container">
        <img src={require("../images/Login.jpg")} alt="Register" />
      </div>
      <div className="space-container"></div>
      <div className="container" style={{ width: "400px", height: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2>Forget Password</h2>
          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              name="Email"
              // autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <button type="submit">Get OTP</button>
        </form>

        <form onSubmit={handleSubmitOTP} style={{ marginTop: "20px" }}>
          {otpInputRefs.map((ref, index) => (
            <input
              key={index}
              type="text"
              autoComplete="off"
              maxLength={1}
              ref={ref}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              style={{ width: "30px", marginRight: "10px" }}
              required
            />
          ))}
          <br />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
