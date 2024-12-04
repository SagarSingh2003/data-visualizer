import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  day: {
    type: Date,
    required: false,
  },
  age: {
    type: String,
    enum: ["15-25", ">25"],
    required: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: false,
  },
  A: {
    type: Number,
    required: false,
  },
  B: {
    type: Number,
    required: false,
  },
  C: {
    type: Number,
    required: false,
  },
  D: {
    type: Number,
    required: false,
  },
  E: {
    type: Number,
    required: false,
  },
  F: {
    type: Number,
    required: false,
  },
});

const DataRecord = mongoose.model("DataRecord", dataSchema);
export default DataRecord;
