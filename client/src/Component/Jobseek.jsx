import axios from "axios";
import React, { useState } from "react";

import './Style/Search.css'
import Nav2 from "./Navbar2";
const JobSeek = () => {
    const [JobName, setJobName] = useState('');
    const [matchingPosts, setMatchingPosts] = useState([]);

    const SearchJob = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/search", {
                JobName,
            });

            if (response.data.matchingPosts != null) {
                setMatchingPosts(response.data.matchingPosts);
                console.log(response.data.matchingPosts);
            }
        } catch (error) {
            console.error("Error searching for jobs:", error);
        }
    }

    return (
        <div className="containerJob">
            <Nav2/>
            <form onSubmit={SearchJob}>
                <input type="text" value={JobName} onChange={e => setJobName(e.target.value)} placeholder="Enter the Skills" />
                <button type="submit">Search</button>
            </form>
            
            <div className="output">
                {matchingPosts.map((data, index) => (
                    <div key={index} id={index} className='common ${index}'>
                        {/* Display your data details here */}
                        <p> <span className="heading">JobName:</span><span>{data.JobName}</span> </p>
                        <p><span className="heading">Skills:</span> <span>{data.Skills}</span></p>
                        <p><span className="heading">AboutCompany:</span> <span>{data.AboutCompany}</span></p>
                        <br />
                        {/* Add more properties as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobSeek;
