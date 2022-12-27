const express = require("express")
const workoutRouter = express.Router()
const Workout = require("../models/workout")

workoutRouter.get("/", (req, res, next) => {
    //Get Full List of workouts
    Workout.find((err, workouts) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(workouts)
    })
})
//Add new workout
workoutRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newWorkout = new Workout(req.body)
    newWorkout.save((err, savedWorkouts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedWorkouts)
    })
})

//Get Workout by id
workoutRouter.get("/:workoutId", (req, res, next) => {
    Workout.find({_id: req.params.workoutId}, (err, workout) => {
        if(err){
            res.status(500)
            next(err)
        }
        return res.status(200).send(workout)
    })
})


//Get workout by user id

workoutRouter.get("/user/workout", (req, res, next) => {
    Workout.find({user: req.auth._id}, (err, workout) => {
        if(err){
            res.status(500)
            next(err)
        }
        return res.status(200).send(workout)
    })
})

//Delete Workout
workoutRouter.delete("/:workoutId", (req, res, next) => {
    console.log(req.params)
    
    Workout.findOneAndDelete(
        { _id: req.params.workoutId},
        (err, deletedWorkout) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedWorkout.workoutTitle}`)
        }
    )
})

// Update Workout, Front end would have to deal with adding or removing array's with exercise ids
// 
workoutRouter.put("/:workoutId", (req, res, next) => {
    Workout.findOneAndUpdate(
        { _id: req.params.workoutId},
        req.body,
        {new: true},
        (err, updatedWorkout) => {
            if(err){
                res.status(500)
                next(err)
            }
            return res.status(201).send(updatedWorkout)
        }
    )
})

// Updating 
// 1. Already created a workout. Already has 2 or more Ids
// When edit is just adding or removing a exercise
// Maybe create a separate route for adding or removing an exercise
// "/workoutId/addexercise/", "/workoutId/removeexercise"
// workoutRouter.put("/:workoutId", (req, res, next) => {
//     console.log(req)

// })
module.exports = workoutRouter