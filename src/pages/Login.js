import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../services/api"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await login(formData.email, formData.password)

      // Redirect based on user role
      switch (response.role.toUpperCase()) {
        case "STUDENT":
          navigate("/student-dashboard")
          break
        case "INSTRUCTOR":
          navigate("/instructor-dashboard")
          break
        case "ADMIN":
          navigate("/admin-dashboard")
          break
        default:
          navigate("/")
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container" style={styles.container}>
      <div className="container">
        <div style={styles.formWrapper}>
          <div style={styles.formCard}>
            <div style={styles.header}>
              <h1 style={styles.title}>Welcome Back</h1>
              <p style={styles.subtitle}>Login to access your courses and continue learning</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={styles.submitBtn} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Don't have an account?{" "}
                <Link to="/register" style={styles.link}>
                  Register here
                </Link>
              </p>
            </div>

            <div style={styles.demoCredentials}>
              <p style={styles.demoTitle}>Demo Credentials:</p>
              <p style={styles.demoItem}>Student: john@example.com / password123</p>
              <p style={styles.demoItem}>Instructor: jane@example.com / password123</p>
              <p style={styles.demoItem}>Admin: admin@example.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "var(--surface)",
    minHeight: "calc(100vh - 70px)",
  },
  formWrapper: {
    maxWidth: "500px",
    margin: "0 auto",
    paddingTop: "3rem",
  },
  formCard: {
    backgroundColor: "var(--background)",
    padding: "3rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "1px solid var(--border)",
  },
  header: {
    textAlign: "center",
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
    fontSize: "1rem",
  },
  form: {
    marginBottom: "2rem",
  },
  submitBtn: {
    width: "100%",
    marginTop: "1rem",
  },
  footer: {
    textAlign: "center",
    paddingTop: "1.5rem",
    borderTop: "1px solid var(--border)",
  },
  footerText: {
    color: "var(--text-secondary)",
  },
  link: {
    color: "var(--primary)",
    textDecoration: "none",
    fontWeight: "600",
  },
  demoCredentials: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "var(--surface)",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
  },
  demoTitle: {
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "var(--text)",
  },
  demoItem: {
    color: "var(--text-secondary)",
    marginBottom: "0.25rem",
  },
}

export default Login
