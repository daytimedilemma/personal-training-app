import React from "react"

export default function ExerciseOptions(props) {
    const { exercises, handleChange, progressionExercise, regressionExercise } = props
    // console.log(exercises)
    // const exercise_id = exercises.map(exercise => (exercise._id))
    // console.log(exercise_id)
    const userExerciseOptions = exercises.map(exercise => {
        const { _id, title } = exercise
        return (
            <option value={_id} key={_id}>{title}</option>
        )
    })
    return (
        <>
            <br/>
            <label>
                Harder Exercise
                <br />
                <select onChange={handleChange} value={progressionExercise}>
                    {userExerciseOptions}
                </select>
            </label>
            <br/>
            <label>
                Easier Exercise
                <br />
                <select onChange={handleChange} value={regressionExercise}>
                    {userExerciseOptions}
                </select>
            </label>
        </>
    )

    //Create a default exercise exercise schema 
}