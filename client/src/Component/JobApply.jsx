import { useState } from "react";
import Nav2 from "./Navbar2";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import './Style/JobPost.css'


const JobApply = ()=>{

    const navigate = useNavigate();
    const [FirstName,setFirstName] = useState('');
    const[LastName,setLastName] = useState('');
    const[Mail,setMail]= useState('');
    const[PhoneNumber,setPhoneNumber] =useState('');
    const[Qualifation,setQualifation] = useState('');
    const[Experince,setExperince] = useState('');


    const Job = async(e)=>{

        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8082/apply",{
                FirstName,LastName,Mail,PhoneNumber,Qualifation,Experince
            });

            if(response.data)
            {

                alert("Job apply sucessfully..");
                navigate('/apply')
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

            <form action="post" className="postJob_form" onSubmit={Job}>
                <div className="formcontent">
                <input type="text" className="jobpostin_input" value={FirstName} onChange={e => setFirstName(e.target.value)} placeholder="FirstName *" required={true} />
                <input type="text" className="jobpostin_input" value={LastName} onChange={e => setLastName(e.target.value)} placeholder="LastName *" required={true} />
                <input type="email" className="jobpostin_input" value={Mail} onChange={e => setMail(e.target.value)} placeholder="Mail *" required={true} />
                <input type="text" className="jobpostin_input"  value={PhoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="PhoneNumber *" required={true}/>
                <input type="text" className="jobpostin_input" value={Qualifation} onChange={e => setQualifation(e.target.value)}  placeholder="Qualifation " />
                <input type="text" className="jobpostin_input" value={Experince} onChange={e => setExperince(e.target.value)} placeholder="Experince *" required={true} />
                <input type="file" />
                <button type="submit">Apply</button>
                </div>
               

            </form>
            
        </div>
        </>
    )
}


export default JobApply;
