// Mock API service for LMS
// In production, replace with actual API endpoints

const API_BASE_URL = "http://localhost:8080/api"

let authToken = null
let currentUser = null

// Helper function to set auth data
export const setAuthData = (data) => {
  authToken = data.token
  currentUser = data
  // Store in sessionStorage for page refresh (more secure than localStorage)
  sessionStorage.setItem("authToken", data.token)
  sessionStorage.setItem("currentUser", JSON.stringify(data))
  window.dispatchEvent(new Event("userChanged"))
}

// Helper function to clear auth data
export const clearAuthData = () => {
  authToken = null
  currentUser = null
  sessionStorage.removeItem("authToken")
  sessionStorage.removeItem("currentUser")
  window.dispatchEvent(new Event("userChanged"))
}

// Initialize from sessionStorage on app load
export const initializeAuth = () => {
  const token = sessionStorage.getItem("authToken")
  const user = sessionStorage.getItem("currentUser")
  if (token && user) {
    authToken = token
    currentUser = JSON.parse(user)
  }
}

// Helper function for API requests
const apiRequest = async (url, options = {}) => {
  const token = getAuthToken()
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(error.message || "Request failed")
  }

  return response.json()
}

// Helper function to get auth token
const getAuthToken = () => {
  return authToken || sessionStorage.getItem("authToken")
}

// Get current user from memory
export const getCurrentUser = () => {
  if (currentUser) return currentUser
  const user = sessionStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

// Auth APIs
export const login = async (email, password) => {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  setAuthData(response)
  return response
}

export const register = async (name, email, password, role = "STUDENT") => {
  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  })
  setAuthData(response)
  return response
}

export const logout = () => {
  clearAuthData()
}

// Course APIs
export const getCourses = async () => {
  return apiRequest("/courses")
}

export const getCourseById = async (id) => {
  return apiRequest(`/courses/${id}`)
}

export const getCoursesByInstructor = async (instructorId) => {
  return apiRequest(`/courses/instructor/${instructorId}`)
}

export const searchCourses = async (keyword) => {
  return apiRequest(`/courses/search?keyword=${encodeURIComponent(keyword)}`)
}

export const getAllCategories = async () => {
  return apiRequest("/courses/categories")
}

export const createCourse = async (courseData, instructorId) => {
  return apiRequest(`/courses?instructorId=${instructorId}`, {
    method: "POST",
    body: JSON.stringify(courseData),
  })
}

export const updateCourse = async (id, courseData) => {
  return apiRequest(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(courseData),
  })
}

export const deleteCourse = async (id) => {
  return apiRequest(`/courses/${id}`, {
    method: "DELETE",
  })
}

export const publishCourse = async (id) => {
  return apiRequest(`/courses/${id}/publish`, {
    method: "PUT",
  })
}

export const getLessonsByCourse = async (courseId) => {
  const course = await apiRequest(`/courses/${courseId}`)
  return course.lessons || []
}

// Enrollment APIs
export const enrollCourse = async (studentId, courseId) => {
  return apiRequest(`/enrollments?studentId=${studentId}&courseId=${courseId}`, {
    method: "POST",
  })
}

export const getEnrollments = async (studentId) => {
  return apiRequest(`/enrollments/student/${studentId}`)
}

export const updateProgress = async (enrollmentId, progress) => {
  return apiRequest(`/enrollments/${enrollmentId}/progress?progress=${progress}`, {
    method: "PUT",
  })
}

export const getCourseEnrollmentCount = async (courseId) => {
  return apiRequest(`/enrollments/course/${courseId}/count`)
}

// User APIs
export const getUserById = async (id) => {
  return apiRequest(`/users/${id}`)
}

export const getAllUsers = async () => {
  return apiRequest("/users")
}

export const updateProfile = async (userId, profileData) => {
  return apiRequest(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  })
}
