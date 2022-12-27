const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: "Workout"
    }],
    medicalHistory: {
        type: String
    },
    clientSince: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Client", clientSchema)