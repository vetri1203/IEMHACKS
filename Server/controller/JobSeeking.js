import multer from 'multer';
import { JobSeeker } from '../model/JobSeeker.js';


export const JobSeeking = async(req,res)=>{
    try{

        const storage = multer.diskStorage({
            destination:"UserResume",
            filename:(req,file,callback)=>{
                callback(null,file.originalname);
            }
        });

        const upload = multer({ 
            storage:storage,
        }).single("Resume");

       

        upload(req,res,async(err)=>{
            if(err)
            {
                res.send({message:`Error : ${err}`});
            }  
            else{
                const time = new Date().toISOString().split('T')[0];
                const {
                    FirstName,
                    LastName,
                    Mail,
                    PhoneNumber,
                    Qualifation,
                    Experince,
                    
                } = req.body;
                if(!FirstName,!LastName,!Mail,!PhoneNumber,!Qualifation,!Experince){
                    res.send({message : "Enter all required details.."});
                }
                else{
                    try{
                        const data = new JobSeeker({
                            FirstName:FirstName,
                            LastName:LastName,
                            Mail:Mail,
                            PhoneNumber:PhoneNumber,
                            Qualifation:Qualifation,
                            Experince:Experince,
                            Resume:{
                                data: req.file.buffer,
                                contentType: "application/pdf",
                            },
                            DateOfApply:time
                        });
                        await data.save();
                        res.send(data);
                    }
                    catch(e){
                        res.send({message:`error : ${e}`});
                    };
                }

                


                
            }
        })
    }
    catch(e)
    {
        res.send({message : e});
    }
    // res.send("Job Seeking is listening..");
}
