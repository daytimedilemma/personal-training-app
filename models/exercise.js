const mongoose = require("mongoose")
const Schema = mongoose.Schema

const exerciseSchema = new Schema ({
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
        enum: ["Body Weight", "KG", "LB"]
    },
    
    objectType: {
        type: String,
        enum: ["Default", "User Created"]
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Exercise", exerciseSchema)