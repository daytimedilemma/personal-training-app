import React, { useState, useContext } from 'react'
import { ACTIONS } from './WorkoutUseReducer'
import { UserContext } from '../../../context/UserProvider'

export default function WorkoutReducerExercise(props) {

  const { submitExerciseSet,
    exercises,
    workoutSets,
    displayPendingWorkout,
    completeWorkout,
    submitCompletedWorkout
  } = useContext(UserContext)
 
 
  
  const { exerciseSet, dispatch } = props
  const [set, setSet] = useState([])
  function addSet() {
    setSet(prevSet => {
      return [...prevSet, { id: Date.now(), reps: 1, weight: 1 }]
    })
    // dispatch({ type: ACTIONS.ADD_SET, payload: { set: { id: Date.now(), reps: 1, weight: 1 } } })
  }
  function handleChange(id, e) {
    const { name, value } = e.target
    const input = set.map(i => {
      if (id === i.id) {
        i[name] = value
      }
      return i;
    })
    setSet(input)
  }
  function submitRepAndWeight(e) {
    e.preventDefault()
    // dispatch({ type: ACTIONS.ADD_SET, payload: { set: set } })
    submitExerciseSet(exerciseSet, set)
    setSet([])
    
  }

  function rmvArr(id) {
    const values = [...set]
    values.splice(values.findIndex(value => value.id === id), 1)
    setSet(values)
}
 

  const displaySetInputs = set.map(workingSet => {

    return (

      <div key={workingSet.id}>
        <label>
          Weight:
          <input
            name='weight'
            value={workingSet.weight}
            onChange={e => handleChange(workingSet.id, e)}
            type='number'
            style={{
              width: "40px"
            }}
          />
        </label>
        <label>
          Reps:
          <input
            name='reps'
            value={workingSet.reps}
            onChange={e => handleChange(workingSet.id, e)}
            type='number'
            style={{
              width: "40px"
            }}
          />
        </label>
        <button onClick={rmvArr}>X</button>
      </div>
    )
  })
  
  return (
    <>
      <h3>Pending Exercise: {exerciseSet.exercise}</h3>
      {displaySetInputs}
      <button onClick={addSet}>Add Set</button>
      <br />
      <button onClick={submitRepAndWeight}>Add Exercise To Workout</button>
      <div>
        {displayPendingWorkout}
        {displayPendingWorkout.length === 0 ?
          <></>
          :
          <>
            <button onClick={completeWorkout}>Prepare Submission</button>
            <button onClick={submitCompletedWorkout}>Complete Submission</button>
          </>
        }
      </div>
    </>
  )
}
