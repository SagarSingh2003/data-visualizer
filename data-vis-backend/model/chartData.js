import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
    day: {
        type: Date,
        required: true
    },
    age: {
        type: String,
        enum: ['15-25', '>25'],
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    A: {
        type: Number,
        required: true
    },
    B: {
        type: Number,
        required: true
    },
    C: {
        type: Number,
        required: true
    },
    D: {
        type: Number,
        required: true
    },
    E: {
        type: Number,
        required: true
    },
    F: {
        type: Number,
        required: true
    }
});

const dataModel = mongoose.model('DataRecord', dataSchema);
export default dataModel;