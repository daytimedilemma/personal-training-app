import React, { useEffect, useState } from "react"
import axios from "axios"

export const WorkoutContext = React.createContext()

const userAxios = axios.create()


userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    workouts: [],
    exercises: [],
    errMsg: ""
}

export default function WorkoutProvider(props){
    const [workoutState, setWorkoutState] = useState(initState)
    useEffect(() => {
      getUserWorkouts()
    })

    function getUserWorkouts() {
        userAxios.get("/api/workouts/user/workout")

            .then(res => {
                setWorkoutState(prevState => ({
                    ...prevState,
                    workouts: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }


}

