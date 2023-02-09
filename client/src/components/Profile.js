import React, { useContext } from 'react'
import ExerciseForm from "./ExerciseForm"
import Exercise from "./Exercise"
import ExerciseList from './ExerciseList'
import { UserContext } from '../context/UserProvider.js'

export default function Profile() {
  const {
    user: {
      username
    },
    addExercise,
    exercises
  } = useContext(UserContext)


  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <div className="exercise--Form-And-List">
       
        <div className="exercise--List">
          <h2>Your Exercises</h2>
          <ExerciseList exercises={exercises} />
        </div>
        <div className="exercise--Form">
        <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGd5bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
        <h2>Add An Exercise</h2>
        <ExerciseForm
          exercises={exercises}
          addExercise={addExercise}
        />
        </div>
      </div>
    </div>
  )
}