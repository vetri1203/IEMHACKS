import React from "react";
import './Style/Register.css'
import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confrimPassowrd, setconfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state ? location.state.message : null;

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const validationErrors = validate(password,confrimPassowrd);

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0){
        try{
            const response = await axios.post("http://localhost:8080/api/pass/changePassword",{
                email,
                password
            });
            if(response.data === "Wrong Email"){
                alert("Wrong Email!! Pease Enter Correct Email")
            }
            if(response.data === "Password Updated!!"){
                alert("Password Updated!!");
                navigate("/login")
            }
            if(response.data === "Error"){
                alert("An Error Occured..Please Try later!!");
            }
        }catch(err){
            console.log(err);
        }
    }

  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = (password,confrimPassowrd) =>{
    const errors= {}
    if(!password){
        errors.password = "Password is Required!!"
    }
    if(!confrimPassowrd){
        errors.confrimPassowrd = "Confirm Password is Required!!"
    }
    if(password !== confrimPassowrd){
        errors.password = "Both Password and Confirm Password Should Be Same!!"
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
          <h2>Password Reset</h2>
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
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></input>
            {formErrors.password && (
              <div className="message">{formErrors.password}</div>
            )}
          </div>
          <div>
            <label>Confirm Password</label>
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
              <div className="message">{formErrors.confrimPassowrd}</div>
            )}
          </div>
          {formErrors.password && (
              <div className="message">{formErrors.password}</div>
          )}
          <button type="submit">Submit</button>
        </form>
        <p>Don't Have an Account?</p>
        <Link to="/register" className="button">
          Register
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
