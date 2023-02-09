import React, { useState } from 'react'
import ExerciseOptions from './ExerciseOptions'
const initInputs = {
  title: "",
  exerciseType: "",
  weightType: "",
  description: "",
  imgUrl: "",
  // progressionExercise: "",
  // regressionExercise: ""
}






export default function TodoForm(props) {

  const [inputs, setInputs] = useState(initInputs)
  const { addExercise, exercises } = props


  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(inputs)
    addExercise(inputs)
    setInputs(initInputs)
  }

  const { title,
    description,
    imgUrl,
    exerciseType,
    weightType,
    progressionExercise,
    regressionExercise,
    //  similarExercise
  } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title" />
      {/* Might Change to radio or select */}
      <input
        type="text"
        name="exerciseType"
        value={exerciseType}
        onChange={handleChange}
        placeholder="Exercise Type"
      />
      {/* Might Change to radio or select */}
      <input
        type="text"
        name="weightType"
        value={weightType}
        onChange={handleChange}
        placeholder="Body Weight, LB, or KB?" />
      <h4>Optional Inputs</h4>


      {/*Select Options for pgression and regressive are provided here*/}
      <ExerciseOptions
        exercises={exercises}
        handleChange={handleChange}
        progressionExercise={progressionExercise}
        regressionExercise={regressionExercise}
      />
      {/* Need to add a related Regression and Progression Form Later 
      <input
        type="text"
        name="progressionExercise"
        value={progressionExercise}
        onChange={handleChange}
        placeholder="Harder Exercise Option" />
      <input
        type="text"
        name="regressionExercise"
        value={regressionExercise}
        onChange={handleChange}
        
        placeholder="Easier Exercise Option" /> */}
        <br />
      <textarea
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description" 
        />
      <br />
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        placeholder="Image Url" />
      <br />
      <button>Add Exercise</button>
    </form>
  )
}