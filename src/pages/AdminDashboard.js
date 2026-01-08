import { useState, useEffect } from "react"
import { getCurrentUser, getAllUsers, getCourses } from "../services/api"

const AdminDashboard = () => {
  const [user] = useState(getCurrentUser())
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [usersData, coursesData] = await Promise.all([getAllUsers(), getCourses()])

      setUsers(usersData)
      setCourses(coursesData)

      const totalEnrollments = coursesData.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0)
      const revenue = coursesData.reduce((sum, course) => sum + course.price * (course.enrollmentCount || 0), 0)

      setStats({
        totalUsers: usersData.length,
        totalCourses: coursesData.length,
        totalEnrollments,
        revenue,
      })
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="page-container">
        <div className="container">
          <p>Access denied. Administrator access required.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>System overview and management</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalCourses.toLocaleString()}</div>
            <div className="stat-label">Total Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalEnrollments.toLocaleString()}</div>
            <div className="stat-label">Total Enrollments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${stats.revenue.toLocaleString()}</div>
            <div className="stat-label">Revenue (Total)</div>
          </div>
        </div>

        <div style={styles.chartsSection}>
          <div className="card" style={styles.chartCard}>
            <h3 style={styles.chartTitle}>User Growth</h3>
            <div style={styles.chartPlaceholder}>
              <p style={styles.chartText}>📈 User growth chart would go here</p>
            </div>
          </div>
          <div className="card" style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Revenue Trend</h3>
            <div style={styles.chartPlaceholder}>
              <p style={styles.chartText}>💰 Revenue chart would go here</p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>User Management</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === "INSTRUCTOR" ? "badge-warning" : "badge-primary"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success">Active</span>
                    </td>
                    <td>
                      <button className="btn btn-outline" style={styles.actionBtn}>
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Course Management</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Students</th>
                  <th>Revenue</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.slice(0, 10).map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.instructorName || "Unknown"}</td>
                    <td>{course.enrollmentCount || 0}</td>
                    <td>${((course.price || 0) * (course.enrollmentCount || 0)).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${course.published ? "badge-success" : "badge-warning"}`}>
                        {course.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-outline" style={styles.actionBtn}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>System Activity</h2>
          <div className="card" style={styles.activityCard}>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>👤</span>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>New user registered: Sarah Johnson</p>
                <p style={styles.activityTime}>5 minutes ago</p>
              </div>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>📚</span>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>New course published: "Machine Learning Basics"</p>
                <p style={styles.activityTime}>1 hour ago</p>
              </div>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>💰</span>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Payment received: $79.99 from Michael Chen</p>
                <p style={styles.activityTime}>2 hours ago</p>
              </div>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>⚠️</span>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Course reported for review: "Web Design 101"</p>
                <p style={styles.activityTime}>3 hours ago</p>
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
  chartsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
  },
  chartCard: {
    padding: "1.5rem",
  },
  chartTitle: {
    fontSize: "1.125rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  chartPlaceholder: {
    height: "250px",
    backgroundColor: "var(--surface)",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed var(--border)",
  },
  chartText: {
    color: "var(--text-secondary)",
    fontSize: "1.125rem",
  },
  section: {
    marginTop: "3rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "1.5rem",
  },
  actionBtn: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
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

export default AdminDashboard
