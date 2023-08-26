import React from 'react'
import "./Register.css";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios'

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleDigitChange = (index, value) => {
    const updatedDigits = [...otpDigits];
    updatedDigits[index] = value;
    setOtpDigits(updatedDigits);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        let response = await axios.post('http://localhost:8080/api/pass/resetPassword',{email});

        if(response.data === "User Not Found! Please Register..."){
          alert("User Not Found! Please Register...");
        }
        else if(response.data === "Email sent successfully"){
          alert("Email sent successfully");
        }else if(response.data === "An error occurred while sending the email"){
          alert("An error occurred while sending the email");
        }else if(response.data === "An error occurred"){
          alert("An error occurred");
        }else{
          alert("Server Busy Try after some time ")
        }
    }catch(err){
      console.log(err);
    }
  };


  const handleSubmitOTP = async (e) =>{
    e.preventDefault();
    const userOTP = otpDigits.join('');
    // console.log(otp);
    try{
       let response = await axios.post("http://localhost:8080/api/pass/verifyOTP",{
        email,
        otp : userOTP
       });

       console.log(response.data);

       if(response.data === "OTP not found"){
        alert("Please Enter OTP")
       }else if(response.data === "OTP verified successfully"){
        alert("OTP verified successfully")
        navigate("/resetPassword",{state : {message :email}});
       }else if(response.data === "Invalid OTP"){
        alert("Invalid OTP");
       }
    }catch(err){
      console.log(err);
    }
  }

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
              type="text"
              placeholder="Enter Email"
              name="Email"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <button type="submit">Get OTP</button>
        </form>

        <form onSubmit={handleSubmitOTP} style={{ marginTop: '20px' }}>
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
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

export default ForgetPassword
