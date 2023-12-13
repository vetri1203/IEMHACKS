import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Style/Search.css";
import Nav2 from "./Navbar2";
const JobSeek = () => {
  const navigate = useNavigate();
  const [JobName, setJobName] = useState("");
  const [matchingPosts, setMatchingPosts] = useState([]);

  const SearchJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/search", {
        JobName,
      });

      console.log(response.data.message);

      if (response.data.matchingPosts != null) {
        setMatchingPosts(response.data.matchingPosts);
        console.log(response.data.matchingPosts);
      } else {
        alert("currently no matching Jobs,please try later");
      }
    } catch (error) {
      console.error("Error searching for jobs:", error);
    }
  };

  const HandleApply = (company) => {
    // navigate("/applyform");
    console.log(company);
    navigate("/applyform", { state: { company } });
  };

  return (
    <>
      <div className="navstore">
        <Nav2 />
      </div>

      <div className="containerJob">
        <form onSubmit={SearchJob} className="searchForm">
          <input
            type="text"
            className="jobseekInput"
            value={JobName}
            onChange={(e) => setJobName(e.target.value)}
            placeholder="Enter the Role"
          />
          <button type="submit" onClick={SearchJob} className="searchbtn">
            Search
          </button>
        </form>

        <div className="output">
          {matchingPosts.map((data, index) => (
            <div key={index} id={index} className={"common ${index}"}>
              <p>
                {" "}
                <span className="heading">JobName : </span>
                <span>{data.JobName}</span>{" "}
              </p>
              <p>
                <span className="heading">Skills : </span>{" "}
                <span>{data.Skills}</span>
              </p>
              <p>
                <span className="heading">AboutCompany : </span>{" "}
                <span>{data.AboutCompany}</span>
              </p>
              <br />
              <button
                className="searchCart"
                onClick={() => HandleApply(data._id)}
              >
                view..
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobSeek;
