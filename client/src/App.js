import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./components/Auth"
import Navbar from "./components/Navbar"
import { UserContext } from "./context/UserProvider"
import Profile from "./components/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import Workout from "./components/workoutComponents/Workout"
import WorkoutUseReducer from "./components/workoutComponents/UserReducerTest/WorkoutUseReducer"
import Client from "./components/ClientComponents/Client"

export default function App() {
  const { token, logout, user } = useContext(UserContext)
  return (
    <div>
    
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Profile />
            </ProtectedRoute>
          }
        />
         {/* <Route
          path="/clients"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Client />
            </ProtectedRoute>
          } */}
        {/* /> */}
        <Route
          path="/workout"
          element={
          <ProtectedRoute token={token} redirectTo="/">
            <Workout />
          </ProtectedRoute>
          }
        />
        <Route
          path="/workoutForm_RepAndWeight"
          element={
          <ProtectedRoute token={token} redirectTo="/">
            <WorkoutUseReducer />
          </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}


