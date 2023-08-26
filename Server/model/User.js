import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength : 6
  },
},
{ timestamps: true }
);

export default mongoose.model("User", RegisterSchema);
