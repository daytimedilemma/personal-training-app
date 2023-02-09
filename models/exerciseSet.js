const mongoose = require("mongoose")
// const exercises = require("./exercise")
const Schema = mongoose.Schema
// Get Request for list of Current exercise
//Set to Varible
//Enum for current Exercises

const DefaultExercise = new Schema({
   
        {
            title: "Pull Up",
            exerciseType: "Back",
            weightType: "BODY WEIGHT",
            objectType: "Default",
            description: "An upper-body exercise that involves hanging from a pull-up bar by your hands with your palms facing away from you, and lifting your entire body up with your arm and back muscles until your chest touches the bar.",
            videoUrl: "https://www.muscleandstrength.com/exercises/pull-up",
            imgUrl: "https://unsplash.com/photos/3dmbSaXZ22c"
        }
    
    exerciseName: {
        type: Schema.Types.ObjectId,
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },


    exerciseSet: [
        {
            reps: {
                type: String
            },
            weight: {
                type: String
            }
        }
    ]

}

    // Sub Documents = Schema is a Template. Individual items are documents
    // Sub Documents are Children of documents
    // Can add more complexity. Can Cause issues of editing in exercises in a given workout
    // Mongoose provides simple way of doing that. https://mongoosejs.com/docs/subdocs.html#finding-a-subdocument
    //

})

module.exports = mongoose.model("ExcerciseSet", exerciseSet)