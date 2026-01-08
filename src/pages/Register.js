

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../services/api"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await register(formData.name, formData.email, formData.password)
      navigate("/student-dashboard")
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
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
              <h1 style={styles.title}>Create Your Account</h1>
              <p style={styles.subtitle}>Join thousands of learners and start your journey today</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

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
                  placeholder="Create a strong password"
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={styles.submitBtn} disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Already have an account?{" "}
                <Link to="/login" style={styles.link}>
                  Login here
                </Link>
              </p>
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
}

export default Register
