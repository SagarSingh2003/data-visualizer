import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;
