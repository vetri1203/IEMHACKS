import mongoose from "mongoose";

const job = new mongoose.Schema(
  {
    JobName: {
      type: String,
      require: true,
    },
    JobType: {
      type: String,
      require: true,
    },
    Skills: {
      type: String,
      require: true,
    },
    Experince: {
      type: String,
    },
    Salary: {
      type: Number,
    },

    Description: {
      type: String,
      require: true,
    },
    AboutCompany: {
      type: String,
      require: true,
    },
    TimeOfPost:{
        type : String
    }
  },
  { timestamps: true }
);

export const JobPost = new mongoose.model("JobDetails", job);
