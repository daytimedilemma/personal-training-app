const mongoose = require("mongoose")
const Schema = mongoose.Schema

const exerciseSchema = new Schema({

    
    title: {
        type: String,
        require: true
    },
    exerciseType: {
        type: String,
        required: true,
    },
    weightType: {
        type: String,
        required: true,
        enum: ["BODY WEIGHT", "KG", "LB", "NONE"],
        uppercase: true
    },

    objectType: {
        type: String,
        enum: ["Default", "User Created"],
        default: "User Created"
    },

    description: {
        type: String,
        default: "Description Not Provided"
    },

    videoUrl: {
        type: String
    },

    imgUrl: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    progressionExercise: {
        // type: Schema.Types.ObjectId,
        // ref: "Exercise",
        type: String,
    },
    regressionExercise: {
        // type: Schema.Types.ObjectId,
        // ref: "Exercise"
        type: String,
    },
    // similarExercise: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Exercise"
    // }]
})

module.exports = mongoose.model("Exercise", exerciseSchema)