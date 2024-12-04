import mongoose from "mongoose";

const sharedDataSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  date_range: {
    type: String,
    required: false,
  },
});

const SharedData = mongoose.model("SharedData", sharedDataSchema);
export default SharedData;
