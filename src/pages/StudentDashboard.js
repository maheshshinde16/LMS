
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, getEnrollments } from "../services/api"

const StudentDashboard = () => {
  const [user] = useState(getCurrentUser())
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEnrollments()
  }, [])

  const loadEnrollments = async () => {
    if (user) {
      try {
        const data = await getEnrollments(user.userId)
        setEnrollments(data)
      } catch (error) {
        console.error("Failed to load enrollments:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="container">
          <p>Please log in to view your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome back, {user.name}! 👋</h1>
          <p style={styles.subtitle}>Continue your learning journey</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{enrollments.length}</div>
            <div className="stat-label">Enrolled Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{enrollments.filter((e) => e.progress === 100).length}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {enrollments.length > 0
                ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
                : 0}
              %
            </div>
            <div className="stat-label">Average Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div className="stat-label">Certificates</div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>My Courses</h2>
            <Link to="/courses" className="btn btn-outline">
              Browse More Courses
            </Link>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : enrollments.length > 0 ? (
            <div className="grid grid-2">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="card" style={styles.courseCard}>
                  <img
                    src={`/.jpg?key=ck9iw&height=200&width=400&query=${encodeURIComponent(enrollment.course?.title || "course")}`}
                    alt={enrollment.course?.title || "Course"}
                    style={styles.courseImage}
                  />
                  <div style={styles.courseContent}>
                    <h3 style={styles.courseTitle}>{enrollment.course?.title || "Course Title"}</h3>
                    <p style={styles.courseInstructor}>by {enrollment.course?.instructor || "Instructor"}</p>

                    <div style={styles.progressSection}>
                      <div style={styles.progressHeader}>
                        <span style={styles.progressLabel}>Progress</span>
                        <span style={styles.progressPercent}>{enrollment.progress || 0}%</span>
                      </div>
                      <div style={styles.progressBar}>
                        <div
                          style={{
                            ...styles.progressFill,
                            width: `${enrollment.progress || 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    <Link
                      to={`/course/${enrollment.course?.id}/lessons`}
                      className="btn btn-primary"
                      style={styles.continueBtn}
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState} className="card">
              <p style={styles.emptyText}>You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn btn-primary">
                Explore Courses
              </Link>
            </div>
          )}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Activity</h2>
          <div className="card" style={styles.activityCard}>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>📚</span>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Completed "Introduction to React"</p>
                <p style={styles.activityTime}>2 hours ago</p>
              </div>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>⭐</span>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Earned certificate in JavaScript</p>
                <p style={styles.activityTime}>1 day ago</p>
              </div>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>🎯</span>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Started "Python for Data Science"</p>
                <p style={styles.activityTime}>3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "1.125rem",
  },
  section: {
    marginTop: "3rem",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text)",
  },
  courseCard: {
    padding: 0,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  courseContent: {
    padding: "1.5rem",
  },
  courseTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "0.5rem",
  },
  courseInstructor: {
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
    marginBottom: "1rem",
  },
  progressSection: {
    marginBottom: "1.5rem",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  progressLabel: {
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
  },
  progressPercent: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "var(--primary)",
  },
  progressBar: {
    height: "8px",
    backgroundColor: "var(--border)",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "var(--primary)",
    transition: "width 0.3s ease",
  },
  continueBtn: {
    width: "100%",
  },
  emptyState: {
    textAlign: "center",
    padding: "3rem",
  },
  emptyText: {
    color: "var(--text-secondary)",
    marginBottom: "1.5rem",
  },
  activityCard: {
    padding: "1.5rem",
  },
  activityItem: {
    display: "flex",
    gap: "1rem",
    padding: "1rem 0",
    borderBottom: "1px solid var(--border)",
  },
  activityIcon: {
    fontSize: "1.5rem",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    color: "var(--text)",
    marginBottom: "0.25rem",
  },
  activityTime: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
  },
}

export default StudentDashboard
