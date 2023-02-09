import React, { useContext, useState, useEffect } from "react"
import WorkoutList from "../workoutComponents/WorkoutList"
import { UserContext } from "../../context/UserProvider"
import WorkoutExcSet from "./WorkoutExcSet"
import { useNavigate } from "react-router-dom"

export default function Workout() {
    const {
        user: {
            username
        },
        addWorkout,
        workouts,
        exercises
    } = useContext(UserContext)

    const navigate = useNavigate()
    return (
        <div className="workout--Page">
            <h1>Workout Page</h1>
            <hr />
            <div className="workout--Div">

                <div className="workout--List">
                    {workouts.length >= 1 ?
                        <WorkoutList username={username} />
                        :
                        <>
                            <h3>You do not have any workouts yet</h3>
                            <h4>Start One Now?</h4>
                            <button onClick={() => navigate("/workoutForm_RepAndWeight")}>Create Workout</button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}