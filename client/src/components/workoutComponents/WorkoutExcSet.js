import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserProvider"
import { useNavigate } from "react-router-dom"
import Title from "./WorkoutForm/Title"



export default function WorkoutExcSet(props) {

  const navigate = useNavigate()
  const {exerciseAndSet, workoutListForm, addWorkout} = useContext(UserContext)
  const { exercisesList } = props
  // const [workingSetInputs, setWorkingSetInputs] = useState(workingSetInitInputs)
  const inputStart = exerciseAndSet.map((start, index) => {
    return (
      <div key={index}>
        <h1>{start.workoutTitle}</h1>
        {/* <p>You picked the exercise {start.exerciseSet.exercise} with  */}
         {/* {start.set >= 2 ? ` ${start.set} sets` : ` ${start.set} set`} */}
         {/* </p> */}
      </div>
    )
  })



  const userExerciseOptions = exercisesList.map(exercise => {
      
       const  {_id, title} = exercise
        return (
            <option value={_id} key={_id}>{title}</option>
        )
    })
    

  

  // function handleSetChange(e){
  //   const { name, value } = e.target
  //   setWorkingSetInputs(prevInput => {
  //     return ({ ...prevInput, [name]: parseInt(value)})

  //   })
  //   console.log(value)
  // }
  
  function handleSubmit(e) {
    e.preventDefault()
    // addWorkout(inputs)
    // setInputs(initInputs)
  }
 


  return (
    <>
     
      <h3>Add A Workout</h3>
      <Title exercisesList={exercisesList}/>
      {exerciseAndSet.length >= 1 ? 
      <div>
      {inputStart}
      <button onClick={() => navigate("/workoutForm_RepAndWeight")}>Submit Exercises and Sets</button>
      </div>
      :
      <></>
    }
    </>
  )
}