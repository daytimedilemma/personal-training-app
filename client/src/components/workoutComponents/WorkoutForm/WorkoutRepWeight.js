import React, { useContext, useState } from "react"
import { UserContext } from "../../../context/UserProvider"
import WorkoutUseReducer from "../UserReducerTest/WorkoutUseReducer"
const { v4: uuidv4 } = require("uuid")
const initInputs = { reps: "", weight: "", id: uuidv4() }


export default function WorkoutRepWeight(props) {
    const { exerciseAndSet,
        setExerciseAndSet,
        workoutListForm
    } = useContext(UserContext)
    const [repsAndWeight, setRepsAndWeight] = useState([initInputs])
    const { v4: uuidv4 } = require("uuid")
    const { exerciseName } = props

    function addArr() {
        setRepsAndWeight(prevArr => [...prevArr, { reps: "", weight: "", id: uuidv4() }])
    }

    function rmvArr(id) {
        const values = [...repsAndWeight]
        values.splice(values.findIndex(value => value.id === id), 1)
        setRepsAndWeight(values)
    }

    function handleChange(id, e) {
        const { name, value } = e.target
        const input = repsAndWeight.map(i => {
            if (id === i.id) {
                i[name] = value
            }
            return i;
        })
        setRepsAndWeight(input)
    }

    async function submitExercise() {
        await setExerciseAndSet(prevInput => ([
                ...prevInput,
               
                {
                    exercise: exerciseName[0],
                   set: [...repsAndWeight]
                }
            ]))       
    }
    
    const displayArr = repsAndWeight.map((item, index) => {

        return (
            <div key={index + item.id}>
                <input
                    name="reps"
                    value={item.reps}
                    placeholder="Reps"
                    onChange={e => handleChange(item.id, e)}
                />
                <input
                    name="weight"
                    value={item.weight}
                    placeholder="Weight"
                    onChange={e => handleChange(item.id, e)}
                />
                <button onClick={rmvArr}>X</button>
            </div>
        )
    })

    return (
        <div >
            <WorkoutUseReducer />
            <button onClick={submitExercise}>Add to Workout</button>
            
        </div>
    )
}