# Learning Management System (LMS) - Frontend

A comprehensive React-based Learning Management System with role-based dashboards for students, instructors, and administrators.

## Features

### 🎓 Student Features
- Browse and search courses
- Enroll in courses
- Track learning progress
- View lessons and course materials
- Personal dashboard with progress tracking

### 👨‍🏫 Instructor Features
- Create and manage courses
- View student enrollments
- Track course performance
- Manage course content
- View reviews and ratings

### 👑 Admin Features
- System-wide analytics
- User management
- Course management
- Revenue tracking
- System activity monitoring

## Pages

1. **Home** - Landing page with features and call-to-action
2. **Login** - User authentication
3. **Register** - New user registration
4. **Courses** - Browse all available courses with filters
5. **Course Details** - Detailed course information and enrollment
6. **Lessons** - Course lesson viewer with video player
7. **Student Dashboard** - Progress tracking and enrolled courses
8. **Instructor Dashboard** - Course creation and management
9. **Admin Dashboard** - System management and analytics
10. **Profile** - User profile management

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Demo Credentials

**Student Account:**
- Email: john@example.com
- Password: password123

**Instructor Account:**
- Email: jane@example.com
- Password: password123

**Admin Account:**
- Email: admin@example.com
- Password: admin123

## Technologies

- React 18
- React Router 6
- CSS3 with CSS Variables
- LocalStorage for session management

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   └── CourseCard.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── Courses.js
│   ├── CourseDetails.js
│   ├── Lessons.js
│   ├── StudentDashboard.js
│   ├── InstructorDashboard.js
│   ├── AdminDashboard.js
│   └── Profile.js
├── services/
│   └── api.js
├── App.js
├── App.css
└── index.js
```

## Features to Implement (Backend Integration)

When connecting to a real backend, replace the mock API calls in `services/api.js` with actual HTTP requests to your Spring Boot backend:

- User authentication with JWT
- Real-time course data
- File uploads for course materials
- Video streaming
- Payment processing
- Email notifications
- Real-time progress tracking
- Advanced analytics

## Notes

This is a frontend-only implementation using mock data. All data is stored in memory and will be reset on page refresh. For production use, integrate with the Spring Boot backend as specified in your project structure.
