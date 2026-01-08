

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getLessonsByCourse, getCourseById } from "../services/api"

const Lessons = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [courseId])

  const loadData = async () => {
    try {
      const [courseData, lessonsData] = await Promise.all([getCourseById(courseId), getLessonsByCourse(courseId)])
      setCourse(courseData)
      setLessons(lessonsData)
      if (lessonsData.length > 0) {
        setCurrentLesson(lessonsData[0])
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.courseTitle}>{course?.title}</h2>
          <button onClick={() => navigate(`/course/${courseId}`)} style={styles.backBtn}>
            ← Back to Course
          </button>
        </div>

        <div style={styles.lessonsList}>
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              style={{
                ...styles.lessonItem,
                ...(currentLesson?.id === lesson.id ? styles.lessonItemActive : {}),
              }}
              onClick={() => setCurrentLesson(lesson)}
            >
              <div style={styles.lessonNumber}>{index + 1}</div>
              <div style={styles.lessonInfo}>
                <div style={styles.lessonTitle}>{lesson.title}</div>
                <div style={styles.lessonDuration}>{lesson.duration}</div>
              </div>
              {lesson.completed && <span style={styles.completedBadge}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.mainContent}>
        {currentLesson ? (
          <>
            <div style={styles.videoSection}>
              <div style={styles.videoPlaceholder}>
                <div style={styles.playButton}>▶</div>
                <p style={styles.videoText}>Video Player - {currentLesson.title}</p>
              </div>
            </div>

            <div style={styles.lessonContent}>
              <h1 style={styles.lessonMainTitle}>{currentLesson.title}</h1>
              <div style={styles.lessonMeta}>
                <span>⏱️ {currentLesson.duration}</span>
                <span className="badge badge-success">{currentLesson.completed ? "Completed" : "In Progress"}</span>
              </div>

              <div style={styles.description}>
                <h3 style={styles.descriptionTitle}>Lesson Overview</h3>
                <p style={styles.descriptionText}>
                  In this lesson, you'll learn about the key concepts and practical applications. Follow along with the
                  video and complete the exercises to master the material.
                </p>
              </div>

              <div style={styles.actions}>
                <button className="btn btn-outline">📥 Download Resources</button>
                <button className="btn btn-primary">Mark as Complete</button>
              </div>
            </div>
          </>
        ) : (
          <div style={styles.noLesson}>
            <p>Select a lesson to begin</p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    height: "calc(100vh - 70px)",
    overflow: "hidden",
  },
  sidebar: {
    width: "350px",
    backgroundColor: "var(--surface)",
    borderRight: "1px solid var(--border)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid var(--border)",
    position: "sticky",
    top: 0,
    backgroundColor: "var(--surface)",
    zIndex: 10,
  },
  courseTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "1rem",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "var(--primary)",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  lessonsList: {
    padding: "1rem",
  },
  lessonItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginBottom: "0.5rem",
    border: "1px solid transparent",
  },
  lessonItemActive: {
    backgroundColor: "var(--background)",
    border: "1px solid var(--primary)",
  },
  lessonNumber: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "var(--primary)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.875rem",
    flexShrink: 0,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: "600",
    color: "var(--text)",
    marginBottom: "0.25rem",
  },
  lessonDuration: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
  },
  completedBadge: {
    color: "var(--success)",
    fontSize: "1.25rem",
  },
  mainContent: {
    flex: 1,
    overflowY: "auto",
  },
  videoSection: {
    backgroundColor: "#000",
    aspectRatio: "16/9",
    maxHeight: "70vh",
  },
  videoPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  playButton: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    marginBottom: "1rem",
    cursor: "pointer",
  },
  videoText: {
    fontSize: "1.125rem",
    opacity: 0.8,
  },
  lessonContent: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  lessonMainTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "1rem",
  },
  lessonMeta: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    alignItems: "center",
  },
  description: {
    marginBottom: "2rem",
  },
  descriptionTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "1rem",
  },
  descriptionText: {
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  noLesson: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "var(--text-secondary)",
  },
}

export default Lessons
