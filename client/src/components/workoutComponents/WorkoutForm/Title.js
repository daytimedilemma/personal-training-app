import React, { useState, useContext } from "react"
import { UserContext } from "../../../context/UserProvider"
import ExerciseOptions from "./ExerciseOption"
import WorkoutUseReducer from "../UserReducerTest/WorkoutUseReducer"

export default function Title(props) {
    const { workoutInitInputs, handleChange, inputs } = useContext(UserContext)
    const { workoutTitle } = inputs
    const {exercisesList} = props
    const [toggleTitle, setToggleTitle] = useState(false)
   function handleTitleToggle(){
    setToggleTitle(prevTog => !prevTog)
   }
    return (
        <div>
            {!toggleTitle ?

                <>
                    <input
                        value={workoutTitle}
                        name="workoutTitle"
                        onChange={handleChange}
                        placeholder="Workout Title"
                    />
                    <button onClick={handleTitleToggle}>Add Workout Sets</button>
                </>

                :

                <>
                    <h2>{workoutTitle}</h2>
                    <WorkoutUseReducer />
                </>

            }
        </div >
    )
}