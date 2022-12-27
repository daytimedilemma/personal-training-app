const express = require("express")
const exercisesRouter = express.Router()
const Exercise = require("../models/exercise")

exercisesRouter.get("/", (req, res, next) => {
    //Get Full List of Exercises
    Exercise.find((err, exercises) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(exercises)
    })
})
//Add new exercise
exercisesRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newExercise = new Exercise(req.body)
    newExercise.save((err, savedExcercise) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedExcercise)
    })
})

//Get Exercises by user id

exercisesRouter.get("/user/exercise", (req, res, next) => {
    Exercise.find({user: req.auth._id}, (err, exercise) => {
        if(err){
            res.status(500)
            next(err)
        }
        return res.status(200).send(exercise)
    })
})

//Delete Exercise
exercisesRouter.delete("/:exerciseId", (req, res, next) => {
    Exercise.findOneAndDelete(
        { _id: req.params.exerciseId, user: req.auth._id},
        (err, deletedExercise) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedExercise.title}`)
        }
    )
})

//Update Exercise
exercisesRouter.put("/:exerciseId", (req, res, next) => {
    Exercise.findOneAndUpdate(
        { _id: req.params.exerciseId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedExercise) => {
            if(err){
                res.status(500)
                next(err)
            }
            return res.status(201).send(updatedExercise)
        }
    )
})

module.exports = exercisesRouter