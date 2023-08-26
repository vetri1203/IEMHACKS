import { JobPost } from "../model/JobPost.js";

export const Recruitment = async (req, res) => {
  try {
    const {
      JobName,
      JobType,
      Skills,
      Experince,
      Salary,
      Description,
      AboutCompany,
    } = req.body;

    if(!JobName,!JobType,!Skills,!Description,!AboutCompany){
        res.status(400).send({message :"Eneter all required fields"});
        return
    }
    else{
   
        const  DateOfPost = new Date().toISOString().split('T')[0];
        const data = await new JobPost({
            JobName:JobName,
            JobType:JobType,
            Skills:Skills,
            Experince:Experince,
            Salary:Salary,
            Description:Description,
            AboutCompany:AboutCompany,
            DateOfPost:DateOfPost

        });

        try{
            data.save();
            res.send(data);
            res.send(JobPost.createdAt)
        }
        catch(e)
        {
            res.send("error while post the job");
        }

        
    }

  } catch (e) {
    console.log(e);
    res.send(500).send({ message: `error ${e}` });
  }
  // res.send("route to rec");
};
