import { Link } from "react-router-dom"

const CourseCard = ({ course }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardImage}>
        <img
          src={`/.jpg?height=200&width=400&query=${encodeURIComponent(course.title)}`}
          alt={course.title}
          style={styles.image}
        />
        <span style={styles.badge} className="badge badge-primary">
          {course.level}
        </span>
      </div>

      <div style={styles.cardContent}>
        <div style={styles.category}>{course.category}</div>
        <h3 style={styles.title}>{course.title}</h3>
        <p style={styles.description}>{course.description}</p>

        <div style={styles.meta}>
          <span style={styles.metaItem}>👤 {course.instructor}</span>
          <span style={styles.metaItem}>⏱️ {course.duration}</span>
        </div>

        <div style={styles.footer}>
          <div style={styles.stats}>
            <span style={styles.rating}>⭐ {course.rating}</span>
            <span style={styles.enrolled}>{course.enrolled} students</span>
          </div>
          <div style={styles.price}>${course.price}</div>
        </div>

        <Link to={`/course/${course.id}`} style={styles.button} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "var(--background)",
    borderRadius: "0.75rem",
    overflow: "hidden",
    border: "1px solid var(--border)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    },
  },
  cardImage: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  badge: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  cardContent: {
    padding: "1.5rem",
  },
  category: {
    color: "var(--primary)",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "0.75rem",
    lineHeight: "1.4",
  },
  description: {
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
    marginBottom: "1rem",
    lineHeight: "1.6",
  },
  meta: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  metaItem: {
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid var(--border)",
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  rating: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "var(--text)",
  },
  enrolled: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--primary)",
  },
  button: {
    width: "100%",
    textAlign: "center",
  },
}

export default CourseCard
