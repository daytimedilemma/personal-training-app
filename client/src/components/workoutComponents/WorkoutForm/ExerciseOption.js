import React, { useState, useContext } from "react"
import { UserContext } from "../../../context/UserProvider"
import WorkoutRepWeight from "./WorkoutRepWeight"
const exerciseInitInputs = {

        exercise:"",
        _id: ""

}

export default function ExerciseOptions(props) {
    const {exercisesList} = props
    const { prepareSet, setPrepareSet } = useContext(UserContext)
    const [exerciseInputs, setExerciseInputs] = useState(exerciseInitInputs)
    const [exerciseArr, setExerciseArr] = useState([])
    function submitExercises(e) {
        e.preventDefault()
        setExerciseArr(prevInput => {
            return ([...prevInput, exerciseInputs])
        })
        setExerciseInputs(exerciseInitInputs)

    }
    
    const { exercise } = exerciseInputs
    function handleExerciseChange(e) {
        const { name, value } = e.target
        setExerciseInputs(prevInput => {
            return ({ ...prevInput, [name]: value })
        })
    }
    const displayArr = exerciseArr.map((exercise, index) => {

        return (
            <div key={index}>
                <WorkoutRepWeight exerciseName={Object.values(exercise)}/>
            </div>
        )
    })

    const userExerciseOptions = exercisesList.map(exercise => {
      console.log(exercise, "exercise")
        const  {_id, title} = exercise
         return (
             <option value={title} key={_id}>{title}</option>
         )
     })
    return (
        <div>
            <select
                value={exercise}
                name="exercise"
                onChange={handleExerciseChange}
            >
                <option>Select an Option</option>
                <option value="Option 1">1</option>
                <option value="Option 2">2</option>
                <option value="Option 3">3</option>
                {userExerciseOptions}
            </select>
            <button onClick={submitExercises}>Add Exercise</button>
            <div>
            {displayArr}
            {displayArr.length >= 1 ? 
            <>
            <br/>
            <button>Submit Workout</button>
            </>
            :
            <></>
            }
            </div>
        </div>
    )
}