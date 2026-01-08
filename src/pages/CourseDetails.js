import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCourseById, enrollCourse, getCurrentUser } from "../services/api"

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [message, setMessage] = useState("")
  const currentUser = getCurrentUser()

  useEffect(() => {
    loadCourse()
  }, [id])

  const loadCourse = async () => {
    try {
      const data = await getCourseById(id)
      setCourse(data)
    } catch (error) {
      console.error("Failed to load course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!currentUser) {
      navigate("/login")
      return
    }

    setEnrolling(true)
    try {
      await enrollCourse(currentUser.userId, id)
      setMessage("Successfully enrolled! Redirecting to lessons...")
      setTimeout(() => {
        navigate(`/course/${id}/lessons`)
      }, 2000)
    } catch (error) {
      setMessage("Enrollment failed. Please try again.")
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="page-container">
        <div className="container">
          <p>Course not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        {message && <div className="alert alert-success">{message}</div>}

        <div style={styles.courseHeader}>
          <div style={styles.headerContent}>
            <div>
              <span className="badge badge-primary" style={styles.badge}>
                {course.level}
              </span>
              <h1 style={styles.title}>{course.title}</h1>
              <p style={styles.description}>{course.description}</p>

              <div style={styles.meta}>
                <span style={styles.metaItem}>
                  👤 <strong>{course.instructor}</strong>
                </span>
                <span style={styles.metaItem}>⏱️ {course.duration}</span>
                <span style={styles.metaItem}>⭐ {course.rating} rating</span>
                <span style={styles.metaItem}>👥 {course.enrolled} students</span>
              </div>
            </div>

            <div style={styles.enrollCard} className="card">
              <img
                src={`/.jpg?height=300&width=400&query=${encodeURIComponent(course.title)}`}
                alt={course.title}
                style={styles.courseImage}
              />
              <div style={styles.priceSection}>
                <div style={styles.price}>${course.price}</div>
                <button
                  onClick={handleEnroll}
                  className="btn btn-primary"
                  style={styles.enrollBtn}
                  disabled={enrolling}
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.courseContent}>
          <div style={styles.contentSection} className="card">
            <h2 style={styles.sectionTitle}>What you'll learn</h2>
            <ul style={styles.learningList}>
              <li>Master the fundamentals and advanced concepts</li>
              <li>Build real-world projects from scratch</li>
              <li>Best practices and industry standards</li>
              <li>Problem-solving and critical thinking skills</li>
            </ul>
          </div>

          <div style={styles.contentSection} className="card">
            <h2 style={styles.sectionTitle}>Course Content</h2>
            <div style={styles.curriculum}>
              <div style={styles.curriculumItem}>
                <span>📚 Introduction and Setup</span>
                <span style={styles.duration}>2 hours</span>
              </div>
              <div style={styles.curriculumItem}>
                <span>🎯 Core Concepts</span>
                <span style={styles.duration}>4 hours</span>
              </div>
              <div style={styles.curriculumItem}>
                <span>🛠️ Practical Projects</span>
                <span style={styles.duration}>6 hours</span>
              </div>
              <div style={styles.curriculumItem}>
                <span>🚀 Advanced Topics</span>
                <span style={styles.duration}>5 hours</span>
              </div>
            </div>
          </div>

          <div style={styles.contentSection} className="card">
            <h2 style={styles.sectionTitle}>Requirements</h2>
            <ul style={styles.requirementsList}>
              <li>Basic computer skills</li>
              <li>Internet connection</li>
              <li>Willingness to learn and practice</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  courseHeader: {
    marginBottom: "3rem",
  },
  headerContent: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "3rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  badge: {
    marginBottom: "1rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "1rem",
    lineHeight: "1.2",
  },
  description: {
    fontSize: "1.125rem",
    color: "var(--text-secondary)",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
  },
  enrollCard: {
    height: "fit-content",
    padding: 0,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  priceSection: {
    padding: "1.5rem",
  },
  price: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--primary)",
    marginBottom: "1rem",
  },
  enrollBtn: {
    width: "100%",
  },
  courseContent: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  contentSection: {
    padding: "2rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "1.5rem",
  },
  learningList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
  },
  curriculum: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  curriculumItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundColor: "var(--surface)",
    borderRadius: "0.5rem",
    alignItems: "center",
  },
  duration: {
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
  },
  requirementsList: {
    paddingLeft: "1.5rem",
    color: "var(--text-secondary)",
    lineHeight: "2",
  },
}

export default CourseDetails
