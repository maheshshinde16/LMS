import { useState } from "react"
import { getCurrentUser, updateProfile } from "../services/api"

const Profile = () => {
  const currentUser = getCurrentUser()
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: "",
    phone: "",
    location: "",
  })
  const [message, setMessage] = useState("")
  const [editing, setEditing] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(currentUser.userId, formData)
      setMessage("Profile updated successfully!")
      setEditing(false)
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Failed to update profile. Please try again.")
    }
  }

  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="container">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div style={styles.header}>
          <h1 style={styles.title}>My Profile</h1>
          <button className="btn btn-outline" onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {message && <div className="alert alert-success">{message}</div>}

        <div style={styles.content}>
          <div className="card" style={styles.profileCard}>
            <div style={styles.avatarSection}>
              <div style={styles.avatar}>{currentUser.name.charAt(0).toUpperCase()}</div>
              <div style={styles.userInfo}>
                <h2 style={styles.userName}>{currentUser.name}</h2>
                <p style={styles.userRole}>
                  <span className="badge badge-primary">{currentUser.role}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editing}
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
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="City, Country"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  className="form-textarea"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {editing && (
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              )}
            </form>
          </div>

          <div style={styles.sidebar}>
            <div className="card" style={styles.statsCard}>
              <h3 style={styles.statsTitle}>Account Statistics</h3>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Member Since</span>
                <span style={styles.statValue}>January 2024</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Courses Enrolled</span>
                <span style={styles.statValue}>12</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Certificates Earned</span>
                <span style={styles.statValue}>8</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Learning Hours</span>
                <span style={styles.statValue}>156</span>
              </div>
            </div>

            <div className="card" style={styles.settingsCard}>
              <h3 style={styles.settingsTitle}>Account Settings</h3>
              <button className="btn btn-outline" style={styles.settingBtn}>
                Change Password
              </button>
              <button className="btn btn-outline" style={styles.settingBtn}>
                Notification Settings
              </button>
              <button className="btn btn-outline" style={styles.settingBtn}>
                Privacy Settings
              </button>
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
  },
  content: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  profileCard: {
    padding: "2rem",
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid var(--border)",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "var(--primary)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    fontWeight: "700",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "0.5rem",
  },
  userRole: {
    fontSize: "0.875rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  statsCard: {
    padding: "1.5rem",
  },
  statsTitle: {
    fontSize: "1.125rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
  },
  statItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    borderBottom: "1px solid var(--border)",
  },
  statLabel: {
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
  },
  statValue: {
    fontWeight: "600",
    color: "var(--text)",
  },
  settingsCard: {
    padding: "1.5rem",
  },
  settingsTitle: {
    fontSize: "1.125rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  settingBtn: {
    width: "100%",
    marginTop: "0.75rem",
    textAlign: "left",
    justifyContent: "flex-start",
  },
}

export default Profile
