import React, { useState, useContext } from 'react'
import { UserContext } from '../../../context/UserProvider'
const titleInitInput = ""
export default function TitleUseReducer() {
    const { workoutTitle, setWorkoutTitle } = useContext(UserContext)
    const [formTitle, setFormTitle] = useState(titleInitInput)
    const [titleToggle, setTitleToggle] = useState(false)
    function handleTitleSubmit(e) {
        e.preventDefault()
        setWorkoutTitle(formTitle)
        setTitleToggle(prevToggle => !prevToggle)
    }


    return (
        <>
            {titleToggle ?
                <>
                    <h1>{workoutTitle}</h1>
                    <button onClick={() => setTitleToggle(prevToggle => !prevToggle)}>Edit Title</button>
                    <br />
                    <br />
                </>
                :
                <>
                    <form onSubmit={handleTitleSubmit}>
                        <input
                            type='text'
                            value={formTitle}
                            name='formTitle'
                            onChange={e => setFormTitle(e.target.value)}
                            placeholder='Workout Title'
                        />
                        <button>Start Your Workout</button>
                    </form>
                    <br />
                    <br />
                </>
            }
        </>

    )
}
