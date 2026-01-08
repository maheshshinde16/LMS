import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../services/api"

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const updateUser = () => {
      setCurrentUser(getCurrentUser())
    }

    window.addEventListener("userChanged", updateUser)
    updateUser()

    return () => {
      window.removeEventListener("userChanged", updateUser)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
    window.dispatchEvent(new Event("userChanged"))
    navigate("/")
  }

  const getDashboardLink = () => {
    if (!currentUser) return null
    switch (currentUser.role) {
      case "STUDENT":
        return "/student-dashboard"
      case "INSTRUCTOR":
        return "/instructor-dashboard"
      case "ADMIN":
        return "/admin-dashboard"
      default:
        return "/"
    }
  }

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>📚</span>
          <span style={styles.logoText}>LMS Platform</span>
        </Link>

        <button style={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>

        <div
          style={{
            ...styles.navLinks,
            ...(mobileMenuOpen ? styles.navLinksMobile : {}),
          }}
        >
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          <Link to="/courses" style={styles.navLink}>
            Courses
          </Link>

          {currentUser ? (
            <>
              <Link to={getDashboardLink()} style={styles.navLink}>
                Dashboard
              </Link>
              <Link to="/profile" style={styles.navLink}>
                Profile
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>
                Login
              </Link>
              <Link to="/register" style={styles.btnRegister}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: "var(--background)",
    borderBottom: "1px solid var(--border)",
    padding: "1rem 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text)",
  },
  logoIcon: {
    fontSize: "1.75rem",
  },
  logoText: {
    color: "var(--primary)",
  },
  mobileMenuButton: {
    display: "none",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "var(--text)",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  navLinksMobile: {
    "@media (max-width: 768px)": {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "var(--background)",
      flexDirection: "column",
      padding: "1rem",
      borderBottom: "1px solid var(--border)",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
  },
  navLink: {
    textDecoration: "none",
    color: "var(--text)",
    fontWeight: "500",
    transition: "color 0.2s",
    ":hover": {
      color: "var(--primary)",
    },
  },
  btnRegister: {
    backgroundColor: "var(--primary)",
    color: "white",
    padding: "0.5rem 1.5rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  logoutBtn: {
    backgroundColor: "var(--danger)",
    color: "white",
    padding: "0.5rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "opacity 0.2s",
  },
}

export default Navbar
