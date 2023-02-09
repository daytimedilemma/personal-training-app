import React, { useEffect, useState, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ACTIONS } from "../components/workoutComponents/UserReducerTest/WorkoutUseReducer"
import { defaultExercises } from "./defaultExercises"

export const UserContext = React.createContext()

const userAxios = axios.create()


userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})



export default function UserProvider(props) {

    const navigate = useNavigate()
    //USER AUTH SECTION
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        clients: [],
        workouts: [],
        exercises: [],
        errMsg: ""
    }

    // const defaultExercises = [{
    //     title: "No Exercise",
    //     exerciseType: "None",
    //     weightType: "NONE",
    //     objectType: "Default"
    // }]

    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                defaultExercises.map(exercise => {
                    return addExercise(exercise)
                })
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token,
                }))

            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            exercises: [],
            clients: [],
            workouts: [],
        })
    }


    function login(credentials) {
        axios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))

                getUserExercises()
                getUserWorkouts()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))


            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    // const [exerciseList, setExerciseList] = useState([])
    // function createExerciseList(){
        
    // }
   
    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }
    // USER EXERCISE SECTION
    function getUserExercises() {
        userAxios.get("/api/exercises/user/exercise")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    exercises: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        getUserExercises()
        getUserWorkouts()
    }, [])



    function addExercise(newExercise) {
        userAxios.post("/api/exercises", newExercise)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    exercises: [...prevState.exercises, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    //USER WORKOUT SECTION

    //Get User Workout
    function getUserWorkouts() {
        userAxios.get("/api/workouts/user/workout")

            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    workouts: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }



    //Add user Workout

    function addWorkout(newWorkout) {
        userAxios.post("/api/workouts", newWorkout)

            .then(res => {
               console.log(res.data)
                setUserState(prevState => ({
                    ...prevState,
                    workouts: [...prevState.workouts, res.data]
                }))

            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteWorkout(_id){
        userAxios.delete(`/api/workouts/${_id}`)
        .then(res => {
            console.log(res.data)
            const workoutList = [...userState.workouts]
            workoutList.splice(workoutList.findIndex(workout => workout._id === _id), 1)
            setUserState(prevState => {
                return {
                    ...prevState,
                    workouts: workoutList
                }
            })
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    const workoutInitInputs = {
        title: "",
        exerciseSet: []

    }

  
    const [workoutSets, setWorkoutSets] = useState([])
    function submitExerciseSet(exerciseSet, set) {
        setWorkoutSets(prevSets => [
            ...prevSets,
            {
                exercise: exerciseSet.exercise,
                set: set
            }])
    }
    const displayPendingWorkout = workoutSets.map((workout, index) => {
       
        const { set } = workout
        const displaySets = set.map(displaySet => {
           
            return (
            <div>
                <span>Weight: {displaySet.weight} Reps: {displaySet.reps}</span>
            </div>
            )
        })
        return (
            <div key={index + workout.exercise}>
                <h1>{workout.exercise}</h1>
                {displaySets}
            </div>
        )
    })

    const [workoutTitle, setWorkoutTitle] = useState("")
    const [completedWorkout, setCompletedWorkout] = useState({
        workoutTitle: '',
        exerciseSet: []
    })
     function completeWorkout(){
       
        setCompletedWorkout(prevWorkout => {
            // const findPushUp = exercises.filter(pushup => {
            //     if(pushup.title === 'Push Up'){
            //      console.log(pushup._id)
            //      return pushup._id
            //     }
            //    })

            return {
                ...prevWorkout,
                workoutTitle: workoutTitle,
                exerciseSet: workoutSets
            }
            
        })
       
    }
     function submitCompletedWorkout(){
       
        setCompletedWorkout(prevUpdate => {
            const {exerciseSet} = prevUpdate
            exerciseSet.map(set => {
                const {exercises} = userState
                const findId = exercises.filter(id => {
                    if(id.title === set.exercise){
                        return set.exercise = id._id
                    }
                })
                console.log(findId)
            })
        }) 
       
        addWorkout(completedWorkout)
        navigate("/workout")
    }
    
    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                addExercise,
                resetAuthErr,
                addWorkout,
                workoutInitInputs,
                submitExerciseSet,
                workoutSets,
                displayPendingWorkout,
                workoutTitle,
                setWorkoutTitle,
                completeWorkout,
                submitCompletedWorkout,
                deleteWorkout
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}