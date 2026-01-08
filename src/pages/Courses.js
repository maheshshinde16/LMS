
import { useState, useEffect } from "react"
import { getCourses } from "../services/api"
import CourseCard from "../components/CourseCard"

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (error) {
      console.error("Failed to load courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || course.level.toLowerCase() === filter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <div className="page-container">
      <div className="container">
        <div style={styles.header}>
          <h1 style={styles.title}>Explore Our Courses</h1>
          <p style={styles.subtitle}>Discover thousands of courses taught by expert instructors</p>
        </div>

        <div style={styles.controls}>
          <input
            type="text"
            className="form-input"
            style={styles.searchInput}
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-select"
            style={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div style={styles.results}>
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
            </div>

            <div className="grid grid-2">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div style={styles.noCourses}>
                <p>No courses found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "var(--text)",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "var(--text-secondary)",
  },
  controls: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: "1",
    minWidth: "250px",
  },
  filterSelect: {
    minWidth: "200px",
  },
  results: {
    marginBottom: "1.5rem",
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
  },
  noCourses: {
    textAlign: "center",
    padding: "3rem",
    color: "var(--text-secondary)",
  },
}

export default Courses
