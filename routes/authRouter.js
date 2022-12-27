const express = require("express")
const authRouter = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")

// Signup
authRouter.post("/signup", (req, res, next) => {
    console.log(req.body)
    User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next( new Error("That username is already taken"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            //Payload and a signature
            const token = jwt.sign(savedUser.toObject(), process.env.PERSONALTRAININGSECRET)
            return res.status(201).send({ token, user: savedUser})
        })
    })
})

//login
authRouter.post("/login", (req, res, next) => {
    User.findOne( {username: req.body.username.toLowerCase()}, (err, user) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next( new Error("Username or Password is incorrect"))
        }
        if(req.body.password !== user.password){
            res.status(403)
            return next( new Error("Username or Password is incorrect"))
        }
        const token = jwt.sign(user.toObject(), process.env.PERSONALTRAININGSECRET)
        return res.status(200).send({token, user})
    })
})





module.exports = authRouter