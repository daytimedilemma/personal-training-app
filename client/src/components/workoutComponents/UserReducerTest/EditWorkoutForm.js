import React, { useState } from 'react'
import EditRepsAndWeight from './EditRepsAndWeight'
export default function EditWorkoutForm(props) {
  const [toggleEdit, setToggleEdit] = useState(false)
  const {workoutTitle, exerciseSet} = props

  
  function handleToggleEdit() {
    setToggleEdit(prevTog => !prevTog)
  }

  const [currentWorkoutEdit, setCurrentWorkoutEdit] = useState({
    workoutTitle: workoutTitle,
    exerciseSet: exerciseSet
  })
  function handleChange(e){
    const {name, value} = e.target
    setCurrentWorkoutEdit(prevEdit => {
      return {
        ...prevEdit,
        [name] : value
      }
    })
  }



  const editSetInputs = exerciseSet.map((sets, index) => {
     const {set} = sets
     
    return (
      <div key={index+ sets.exercise.title}>
       <h3>{sets.exercise.title}</h3>
        {set.map(setArr => {
          function addArr(setSet) {
            setSet(prevArr => [...prevArr, { reps: "", weight: "", id: Date.now() }])
        }
          return (
            <>
            <EditRepsAndWeight 
            sets={sets}
            setArr={setArr}
            addArr={addArr}
            />
           
            </>
          )
        })}
      </div>
    )
  })
  return (
    <div>
      {toggleEdit ?
        <>
          <h3>Editing</h3>
          <form>
            <input
            type='text'
            value={currentWorkoutEdit.workoutTitle}
            name='workoutTitle'
            placeholder={`${currentWorkoutEdit.workoutTitle}`}
            onChange={handleChange}
            />
            <br/>
            <br/>
            {editSetInputs}
          </form>
          <button onClick={handleToggleEdit}>Cancel Edit</button>
        </>
        :
        <button onClick={handleToggleEdit}>Edit Workout</button>
      }
    </div>
  )
}
