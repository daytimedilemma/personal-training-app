import React, { useState, useReducer, useContext } from 'react'
import WorkoutReducerExercise from './WorkoutReducerExercise';
import TitleUseReducer  from './TitleUseReducer'
import { UserContext } from '../../../context/UserProvider';

export const INITIAL_STATE = {
    title: "",
    exerciseSet: []
}
export const ACTIONS = {
    ADD_TITLE: "add-title",
    ADD_EXERCISE: "add-exercise",
    ADD_SET: "add-set"
}

function reducer(exerciseSet, action) {
    switch (action.type) {

        case ACTIONS.ADD_EXERCISE:
            return {
                ...exerciseSet,
                exercise: newExercise(action.payload.exercise)
            };
        case ACTIONS.ADD_SET:
            return {
                ...exerciseSet,
                set:  newSet(action.payload.set)
            }

        default:
            return exerciseSet
    }


}


function newSet(set) {
    return [...set, set]
}

function newExercise(exercise) {
    
    return exercise
    
}
const exerciseInitInput = {}
export default function WorkoutUseReducer() {
    const { exercises } = useContext(UserContext)
    const [exerciseSet, dispatch] = useReducer(reducer, {})
    const [exercise, setExercise] = useState(exerciseInitInput)

    const userExerciseOptions = exercises.map(exercise => {
            
          
           return (
               <option value={exercise.title} key={exercise._id}>{exercise.title}</option>
           )
       })
    
    function handleSubmit(e) {
        e.preventDefault()
        dispatch({ type: ACTIONS.ADD_EXERCISE, payload: { exercise: exercise } })
    }
    
    return (
        <div className="workout--FormPage">
        <div className="workout--Form">
                <TitleUseReducer />
                <form onSubmit={handleSubmit}>
                    <select
                    value={exercise}
                    onChange={e => setExercise(e.target.value)}
                >
                    <option>--- Select Exercise ---</option>
                    {userExerciseOptions}
                </select> 
                     <button>Add Exercise</button>
                    
                </form>  
            <br />
            <WorkoutReducerExercise
                dispatch={dispatch}
                exerciseSet={exerciseSet}
            />
            
        </div>
        
        <img src="https://images.unsplash.com/photo-1623874106686-5be2b325c8f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGd5bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60"/>
        
        </div>

    )
}
