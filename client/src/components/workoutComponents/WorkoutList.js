import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserProvider"
import EditWorkoutForm from "./UserReducerTest/EditWorkoutForm"


export default function Workoutlist(props) {
    const { username } = props
    const [toggle, setToggle] = useState(false)
    const [toggleTitle, setToggleTitle] = useState(false)
    const { workouts, deleteWorkout } = useContext(UserContext)
   

    function toggleDetails() {
        setToggle(prevTog => !prevTog)
    }

    function toggleTittle() {
        setToggleTitle(prevTog => !prevTog)
    }

    const displayWorkouts = workouts.map((workout, workoutIndex) => {
        const { exerciseSet, workoutTitle } = workout

        const exerciseListDetails = exerciseSet.map((details, index) => {

            const { exercise, set } = details
            const { description, exerciseType, objectType, weightType, title } = exercise
            console.log(description)
            const setDisplay = set.map((weightAndReps, index) => {
                return (
                    <div key={index + weightAndReps}>
                        <span>Set {index+1}</span>
                        <li>Reps: {weightAndReps.reps} Weight: {weightAndReps.weight}</li>
                        <br />
                    </div>
                )
            })
            return (
                <div key={details + index} onClick={toggleDetails}>
                    {toggle ?

                        <>
                            <h4>{title} </h4>
                            <ul>
                                {setDisplay}
                            </ul>
                            <p
                                className="workoutList--Exercise"
                            >{title} is in the {exerciseType} category
                                and is measured in {weightType}. {objectType === "User Created" ?
                                    `This exercise was created by ${username}` : "This is a default excercise"
                                }
                            </p>
                                {description === "Description Not Provided" ?
                                <p>A description was not provided</p>
                                :
                                <p>Description: {description}</p>
                            }
                                
                        
                        </>
                        :
                        <>
                            <h4>{title} </h4>
                            <ul>
                                {setDisplay}
                            </ul>
                        </>

                    }
                </div>
            )
        })
        
        return (
            <li key={workout + workoutIndex}>
                <h2 onClick={toggleTittle}>{workoutTitle}</h2>
                {toggleTitle ?
                    <>{exerciseListDetails}</>
                    :
                    <p>Click the title to view details</p>
                }
               
                <button onClick={() => deleteWorkout(workout._id)}>Delete Workout</button>
            </li>
        )

    })
    return (
        <div className="workout--List">
            <h3>Your Current List of Workouts</h3>
            <ul>{displayWorkouts}</ul>

        </div>
    )
}