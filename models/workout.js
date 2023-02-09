const mongoose = require("mongoose")
const exercises = require("./exercise")
const Schema = mongoose.Schema
// Get Request for list of Current exercise
//Set to Varible
//Enum for current Exercises


const workoutSchema = new Schema({
    workoutTitle: {
        type: String,
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    //Default Workouts?

    // exerciseList: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Exercise",
    // }, 

    exerciseSet: [

        {
            exercise: {
                type: Schema.Types.ObjectId,
                ref: "Exercise",
            },
            set: [
                {
                    id: {
                        type: String
                    },
                    reps: {
                        type: Number
                    },
                    weight: {
                        type: String
                    }
                }
            ]

        }

    ]
    // Sub Documents = Schema is a Template. Individual items are documents
    // Sub Documents are Children of documents
    // Can add more complexity. Can Cause issues of editing in exercises in a given workout
    // Mongoose provides simple way of doing that. https://mongoosejs.com/docs/subdocs.html#finding-a-subdocument
    // 

})

module.exports = mongoose.model("Workout", workoutSchema)