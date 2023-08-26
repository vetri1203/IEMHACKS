import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = validate(username, email, password);
    setFormErrors(validationErrors);

    // Check if there are validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            username ,
            email,
            password,
          }
        );

        if (response.data === "User Already Exists!! Login Instead") {
          alert("User Already Exists!! Login Instead");
          navigate("/login");
        } else {
          // Navigate to the "insta" page
          navigate("/insta");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = (username, email, password) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      errors.username = "Userusername is Required!";
    }
    if (!email) {
      errors.email = "Email is Required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!password) {
      errors.password = "Password is Required!";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (password.length > 10) {
      errors.password = "Password must be less than 10 characters!";
    }
    return errors;
  };

  return (
    <div className="body">
      <div className="image-container">
        <img src={require("../images/Register.jpg")} alt="Register" />
      </div>
      <div className="space-container"></div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div>
            <label>
              <strong>Userusername</strong>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter username"
              username="username"
              value={username}
              autoComplete="off"
              required
              onChange={(e) => setusername(e.target.value)}
            ></input>
            {formErrors.username && (
              <div className="message">{formErrors.username}</div>
            )}
          </div>
          <div>
            <label>
              <strong>Email</strong>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Email"
              username="Email"
              value={email}
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {formErrors.email && (
              <div className="message">{formErrors.email}</div>
            )}
          </div>
          <div>
            <label>
              <strong>Password</strong>
            </label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              username="Password"
              value={password}
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {formErrors.password && (
              <div className="message">{formErrors.password}</div>
            )}
          </div>
          <button type="submit">Next</button>
        </form>
        <p>Already Have an Account?</p>
        <Link to="/login" className="button">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
