import { FundRequest } from "../model/Funding.js";



export const CrowdFunding = async(req,res) =>{
    try{
        const{
            ProjectName,
            AboutProject,
            FundAmount,
            ContactInfo
        }=req.body

        if(!ProjectName,!AboutProject,!FundAmount){
            res.status(400).send({message:"Enter the all required details.."})
        }
        else{
            if(AboutProject.length<100)
            {
                res.status(400).send("Description About the project must be cotain atleast 100 characters");
            }
            const date = new Date().toISOString().split('T')[0];
            const data = await new FundRequest({
                ProjectName:ProjectName,
                AboutProject:AboutProject,
                FundAmount:FundAmount,
                ContactInfo:ContactInfo,
                Date:date

            });


            try{
                data.save();
                res.status(200).send(data);
            }
            catch(err){
                res.status(500).send({message:err});
            }
        }
    }
    catch(e){
        res.status(500).send({message:`${e}`});
    }
}