import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Transform Your Future with <span style={styles.highlight}>Online Learning</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Access thousands of courses from industry experts. Learn at your own pace and advance your career with our
              comprehensive learning platform.
            </p>
            <div style={styles.heroCta}>
              <Link to="/courses" className="btn btn-primary" style={styles.ctaButton}>
                Explore Courses
              </Link>
              <Link to="/register" className="btn btn-outline" style={styles.ctaButton}>
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div className="container">
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>10,000+</div>
              <div style={styles.statLabel}>Active Students</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>500+</div>
              <div style={styles.statLabel}>Expert Instructors</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>1,200+</div>
              <div style={styles.statLabel}>Online Courses</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>95%</div>
              <div style={styles.statLabel}>Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Why Choose Our Platform</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🎓</div>
              <h3 style={styles.featureTitle}>Expert Instructors</h3>
              <p style={styles.featureText}>Learn from industry professionals with years of real-world experience</p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📱</div>
              <h3 style={styles.featureTitle}>Learn Anywhere</h3>
              <p style={styles.featureText}>Access courses on any device, anytime, anywhere in the world</p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏆</div>
              <h3 style={styles.featureTitle}>Get Certified</h3>
              <p style={styles.featureText}>Earn certificates upon completion to showcase your skills</p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💼</div>
              <h3 style={styles.featureTitle}>Career Support</h3>
              <p style={styles.featureText}>Get career guidance and job placement assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div className="container">
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to Start Learning?</h2>
            <p style={styles.ctaText}>Join thousands of students already learning on our platform</p>
            <Link to="/register" className="btn btn-secondary" style={styles.ctaBtn}>
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const styles = {
  hero: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "5rem 0",
    textAlign: "center",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "1.5rem",
    lineHeight: "1.2",
  },
  highlight: {
    color: "#fbbf24",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    opacity: 0.95,
    lineHeight: "1.6",
  },
  heroCta: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaButton: {
    fontSize: "1.125rem",
    padding: "1rem 2rem",
  },
  stats: {
    padding: "4rem 0",
    backgroundColor: "var(--surface)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
  },
  statCard: {
    textAlign: "center",
  },
  statValue: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "var(--primary)",
    marginBottom: "0.5rem",
  },
  statLabel: {
    color: "var(--text-secondary)",
    fontSize: "1rem",
    fontWeight: "500",
  },
  features: {
    padding: "5rem 0",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "3rem",
    color: "var(--text)",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  featureCard: {
    textAlign: "center",
    padding: "2rem",
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "var(--text)",
  },
  featureText: {
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  cta: {
    background: "var(--primary)",
    color: "white",
    padding: "5rem 0",
    textAlign: "center",
  },
  ctaContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  ctaText: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    opacity: 0.95,
  },
  ctaBtn: {
    fontSize: "1.125rem",
    padding: "1rem 2rem",
  },
}

export default Home
