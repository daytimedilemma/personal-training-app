const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const {expressjwt} = require("express-jwt")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(`mongodb+srv://nickaminer94:${process.env.ATLAS_PASSWORD}@cluster0.oagvemx.mongodb.net/?retryWrites=true&w=majority`, 
() => console.log("Connected to DB"))

app.use("/auth", require("./routes/authRouter"))
app.use("/api", expressjwt({secret: process.env.PERSONALTRAININGSECRET,
    algorithms: ["HS256"]}))
app.use("/api/exercises", require("./routes/exercisesRouter"))
app.use("/api/workouts", require("./routes/workoutRouter"))
app.use("/api/client", require("./routes/clientRoute"))


app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(1300, ()=> {
    console.log("Server is running on local port 1300")
})