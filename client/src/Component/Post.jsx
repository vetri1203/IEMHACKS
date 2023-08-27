import { useState } from "react";
import Nav2 from "./Navbar2";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import './Style/JobPost.css'


const Post = ()=>{

    const navigate = useNavigate();
    const [JobName,setJobName] = useState('');
    const[JobType,setJobType] = useState('');
    const[Skills,setSkills]= useState('');
    const[Experince,setExperince] =useState('');
    const[Salary,setSalary] = useState('');
    const[Description,setDescription] = useState('');
    const[AboutCompany,setAboutCompany] = useState('');


    const postJob = async(e)=>{

        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8081/job",{
                JobName,JobType,Skills,Experince,Salary,Description,AboutCompany
            });

            if(response.data)
            {

                alert("Job Posted sucessfully..");
                navigate('/home')
                console.log(response.data);

            }
            else{
                console.log("sorry");
            }

        }
        catch(err){
            alert(err);
        }

    }
    return(
        <>
        <Nav2/>

        <div className="postPage_container">

            <form action="post" className="postJob_form" onSubmit={postJob}>
                <div className="formcontent">
                <input type="text" className="jobpostin_input" value={JobName} onChange={e => setJobName(e.target.value)} placeholder="Role ex:(SDE)*" required={true} />
                <input type="text" className="jobpostin_input" value={JobType} onChange={e => setJobType(e.target.value)} placeholder="JobType ex:(full-time)*" required={true} />
                <input type="text" className="jobpostin_input" value={Skills} onChange={e => setSkills(e.target.value)} placeholder="Skills *" required={true} />
                <input type="text" className="jobpostin_input"  value={Experince} onChange={e => setExperince(e.target.value)} placeholder="Experince *" required={true}/>
                <input type="text" className="jobpostin_input" value={Salary} onChange={e => setSalary(e.target.value)}  placeholder="Salary " />
                <input type="text" className="jobpostin_input" value={Description} onChange={e => setDescription(e.target.value)} placeholder="Description *" required={true} />
                <input type="text" className="jobpostin_input" value={AboutCompany} onChange={e => setAboutCompany(e.target.value)} placeholder="AboutCompany *" required={true} />
                <button type="submit">Post Job</button>
                </div>
               

            </form>
            
        </div>
        </>
    )
}


export default Post;
