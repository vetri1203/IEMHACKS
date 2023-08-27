import React from "react";
import Footer from "./Footer";
import Nav2 from "./Navbar2";
import "./Style/Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const PostRedirect = () => {
    navigate("/postjob");
  };

  const JobRedirect = () => {
    navigate("/apply");
  };
  return (
    <>
      <Nav2 />
      <div className="Homecontainer">
        <div className="home_log">
          <div className="logContainer">
            <div className="intro">
              Are you bothered about your carrier and life
            </div>{" "}
            <br />
            <span className="redirect_info">
              Let’s get into <b>Aluminoid </b>, heh heh
            </span>
          </div>
          <div className="btn_link">
            <div className="job1">
              <button className="btnsearch" onClick={JobRedirect}>
                {" "}
                <span className="searchtext">search</span>
                <img
                  className="jobserarch"
                  src={require("../images/right-arrow (1) 1.png")}
                  alt="Register"
                />
              </button>
            </div>

            <div className="job2">
              <button className="btnpost" onClick={PostRedirect}>
                {" "}
                <span className="posttext">Post</span>
                <img
                  className="jobserarch"
                  src={require("../images/right-arrow (1) 1.png")}
                  alt="Register"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="imgcontainer">
          <img
            className="home_img"
            src={require("../images/Login.jpg")}
            alt="Register"
          />
        </div>
      </div>
      <Footer className="home-Footer" />
    </>
  );
};

export default Home;
