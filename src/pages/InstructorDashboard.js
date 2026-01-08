import { useState } from "react"
import { getCurrentUser, createCourse } from "../services/api"

const InstructorDashboard = () => {
  const [user] = useState(getCurrentUser())
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Beginner",
    price: "",
    category: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createCourse(
        {
          ...formData,
          price: Number.parseFloat(formData.price),
        },
        user.userId,
      )
      setShowCreateForm(false)
      setFormData({
        title: "",
        description: "",
        duration: "",
        level: "Beginner",
        price: "",
        category: "",
      })
      alert("Course created successfully!")
    } catch (error) {
      console.error("Failed to create course:", error)
      alert("Failed to create course. Please try again.")
    }
  }

  if (!user || user.role.toUpperCase() !== "INSTRUCTOR") {
    return (
      <div className="page-container">
        <div className="container">
          <p>Access denied. Instructor access required.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Instructor Dashboard</h1>
            <p style={styles.subtitle}>Manage your courses and students</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Cancel" : "+ Create New Course"}
          </button>
        </div>

        {showCreateForm && (
          <div className="card" style={styles.createForm}>
            <h2 style={styles.formTitle}>Create New Course</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    className="form-input"
                    placeholder="e.g., 8 weeks"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Level</label>
                  <select name="level" className="form-select" value={formData.level} onChange={handleChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div style={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-input"
                    placeholder="e.g., Web Development"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-input"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Create Course
              </button>
            </form>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">4</div>
            <div className="stat-label">Total Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">5,300</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">4.8</div>
            <div className="stat-label">Avg Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">$12,450</div>
            <div className="stat-label">Total Earnings</div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>My Courses</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Students</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Introduction to React</td>
                  <td>1,250</td>
                  <td>⭐ 4.8</td>
                  <td>
                    <span className="badge badge-success">Published</span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={styles.actionBtn}>
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Advanced JavaScript</td>
                  <td>890</td>
                  <td>⭐ 4.9</td>
                  <td>
                    <span className="badge badge-success">Published</span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={styles.actionBtn}>
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Python for Data Science</td>
                  <td>2,100</td>
                  <td>⭐ 4.7</td>
                  <td>
                    <span className="badge badge-success">Published</span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={styles.actionBtn}>
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>UI/UX Design Fundamentals</td>
                  <td>1,560</td>
                  <td>⭐ 4.6</td>
                  <td>
                    <span className="badge badge-success">Published</span>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={styles.actionBtn}>
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Reviews</h2>
          <div className="card">
            <div style={styles.review}>
              <div style={styles.reviewHeader}>
                <div>
                  <strong>Sarah Johnson</strong>
                  <span style={styles.rating}>⭐⭐⭐⭐⭐</span>
                </div>
                <span style={styles.reviewDate}>2 days ago</span>
              </div>
              <p style={styles.reviewText}>
                Excellent course! The instructor explains everything clearly and the projects are very practical.
              </p>
            </div>
            <div style={styles.review}>
              <div style={styles.reviewHeader}>
                <div>
                  <strong>Michael Chen</strong>
                  <span style={styles.rating}>⭐⭐⭐⭐⭐</span>
                </div>
                <span style={styles.reviewDate}>5 days ago</span>
              </div>
              <p style={styles.reviewText}>
                Best React course I've taken. Highly recommend for anyone starting with React!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
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
  createForm: {
    padding: "2rem",
    marginBottom: "2rem",
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
  },
  formRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
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
  review: {
    padding: "1.5rem",
    borderBottom: "1px solid var(--border)",
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
    alignItems: "center",
  },
  rating: {
    marginLeft: "0.5rem",
    fontSize: "0.875rem",
  },
  reviewDate: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
  },
  reviewText: {
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
}

export default InstructorDashboard
