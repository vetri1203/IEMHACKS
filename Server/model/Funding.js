import mongoose from "mongoose";


const Funding = new mongoose.Schema({
    ProjectName:{
        type:String,
        
    },
    AboutProject : {
        type:String
    },
    FundAmount:{
        type:Number,
    },
    ContactInfo:{
        type:String
    },
    Date:{
        type:String
    }
});

export const FundRequest = new mongoose.model('FundsData',Funding);