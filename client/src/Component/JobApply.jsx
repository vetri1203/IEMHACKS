import { useEffect, useState } from "react";
import Nav2 from "./Navbar2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Style/JobPost.css";

const JobApply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Qualification, setQualification] = useState("");
  const [Experience, setExperience] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [Status, setStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8082/about", {
          companyId: location.state?.company,
        });
        if (response.data != null) {
          setCompanyData(response.data);
        } else {
          console.log("sorry");
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
        // Handle error, maybe redirect to an error page or display a message
      }
    };

    fetchData();
  }, [location.state?.company]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/apply", {
        FirstName,
        LastName,
        Mail,
        PhoneNumber,
        Qualification,
        Experience,
      });

      if (response.data) {
        alert("Job applied successfully.");
        navigate("/apply");
        console.log(response.data);
      } else {
        console.log("Sorry, job application failed.");
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      alert("Sorry, an error occurred while applying for the job.");
    }
  };

  const HanleStatus = (data) => {
    setStatus(true);
  };
  return (
    <>
      <Nav2 />
      <div className="CompanyDetails">
        {companyData.map((data, index) => (
          <div key={index} id={index} className={`common ${index}`}>
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
              <span className="heading">Company : </span>{" "}
              <span>{data.AboutCompany}</span>
            </p>
            <p>
              <span className="heading">JobType : </span>{" "}
              <span>{data.JobType}</span>
            </p>
            <p>
              <span className="heading">Description : </span>{" "}
              <span>{data.Description}</span>
            </p>
            <p>
              <span className="heading">Date of Post : </span>{" "}
              <span>{data.DateOfPost}</span>
            </p>
            {data.Salary != null && (
              <p>
                <span className="heading">salary : </span>{" "}
                <span>{data.Salary}</span>
              </p>
            )}
            {data.Experience != null && (
              <p>
                <span className="heading">Experience : </span>{" "}
                <span>{data.Experience}</span>
              </p>
            )}
            <br />
            <button
              className="searchCart"
              onClick={() => HanleStatus(data.AboutCompany)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
      <div className="postPage_container">
        {Status === true && (
          <form action="post" className="postJob_form" onSubmit={handleApply}>
            <div className="formcontent">
              <input
                type="text"
                className="jobpostin_input"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="FirstName *"
                required
              />
              <input
                type="text"
                className="jobpostin_input"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="LastName *"
                required
              />
              <input
                type="email"
                className="jobpostin_input"
                value={Mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Mail *"
                required
              />
              <input
                type="text"
                className="jobpostin_input"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="PhoneNumber *"
                required
              />
              <input
                type="text"
                className="jobpostin_input"
                value={Qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="Qualification "
              />
              <input
                type="text"
                className="jobpostin_input"
                value={Experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience *"
                required
              />
              <input type="file" />
              <button type="submit">Apply</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default JobApply;
