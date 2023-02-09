import React, { useEffect } from "react"

export default function Exercise(props) {
    const { title,
        exerciseType,
        description,
        weightType,
        objectType,
        progressionExercise,
        regressionExercise,
        // similarExercise,
        videoUrl,
        imgUrl,
        _id,
        getUserExercise
    } = props

    // useEffect(() => {
    //     getUserExercise()
    // }, [])
    // const displayExercise = similarExercise.map(exercise => <span>{exercise}</span>)
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                <li>Weight Type: {weightType}</li>
                <li>Exercise Type: {exerciseType}</li>
                {/* {progressionExercise === "" ?
                    <li>Progression Exercise: {progressionExercise}</li> :
                    <li>There was no Progression Exercise Listed</li>
                }
                {regressionExercise === "" ?
                    <li>Regression Exercise: {regressionExercise}</li> :
                    <li>There was no Regression Exercise Listed</li>
                }
                {/* {similarExercise.length >= 1 ?
                     
                    <li> Similar Exercises: {displayExercise}</li> :
                    <li>There was no Similar Exercises Listed</li>
                } */} 
                {description === "Description Not Provided" || description === "" ? 
                <p>Description Not Provided</p>
                :
                <p>Description: {description}</p>
                }

            </ul>
        </div>
    )
}