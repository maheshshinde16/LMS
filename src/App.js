

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Courses from "./pages/Courses"
import CourseDetails from "./pages/CourseDetails"
import Lessons from "./pages/Lessons"
import StudentDashboard from "./pages/StudentDashboard"
import InstructorDashboard from "./pages/InstructorDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Profile from "./pages/Profile"
import { initializeAuth } from "./services/api"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/course/:courseId/lessons" element={<Lessons />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
