package com.lms.service;

import com.lms.model.Enrollment;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    public Enrollment enrollStudent(String studentId, String courseId) {
        if (!userRepository.existsById(studentId)) {
            throw new RuntimeException("Student not found");
        }
        
        if (!courseRepository.existsById(courseId)) {
            throw new RuntimeException("Course not found");
        }
        
        if (enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId).isPresent()) {
            throw new RuntimeException("Already enrolled in this course");
        }
        
        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollment.setProgress(0);
        
        return enrollmentRepository.save(enrollment);
    }
    
    public List<Enrollment> getStudentEnrollments(String studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
    
    public Enrollment updateProgress(String enrollmentId, Integer progress) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        
        enrollment.setProgress(progress);
        return enrollmentRepository.save(enrollment);
    }
    
    public Long getCourseEnrollmentCount(String courseId) {
        return enrollmentRepository.countByCourseId(courseId);
    }
}
