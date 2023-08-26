import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[formErrors,setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {    
    e.preventDefault();
    
    // Perform form validation
    const validationErrors = validate(email, password);
    setFormErrors(validationErrors);
  
    // Check if there are validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8081/api/auth/login",{
          email,
          password
        });
        if(response.data === "User Not Found! Please Register..."){
          alert("User Not Found! Please Register...");
          navigate("/register");
        }
        if(response.data === "Wrong password or username!"){
          alert("Wrong password or username!");
        }
        else if(response.data.message === "Logged In SuccessFully!!!"){
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(()=>{
    console.log(formErrors);
  },[formErrors]);

  const validate = (email,password) =>{
    const errors = {};
    if(!email){
      errors.email = "Email is required!!";
    }
    if(!password){
      errors.password = "Password is required!!";
    }
    return errors;
  }

  return (
    <div className="body">
      <div className="image-container">
        <img src={require("../images/Login.jpg")} alt="Register" />
      </div>
      <div className="space-container"></div>
      <div className="container" style={{ width: "400px", height: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
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
            {formErrors.email && (
              <div className="message">{formErrors.email}</div>
            )}
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="Password"
              id="pass"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {formErrors.password && (
              <div className="message">{formErrors.password}</div>
            )}
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
          <Link to="/forgetPassword" className="f-pass">Forget Password?</Link>
        </div>
        <p>Don't Have an Account?</p>
        <Link to="/register" className="button">
          Register
        </Link>
      </div>
    </div>
  );
}
export default Login;
