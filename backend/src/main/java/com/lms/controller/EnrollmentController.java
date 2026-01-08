package com.lms.controller;

import com.lms.model.Enrollment;
import com.lms.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @PostMapping
    public ResponseEntity<Enrollment> enrollStudent(
            @RequestParam String studentId,
            @RequestParam String courseId) {
        return ResponseEntity.ok(enrollmentService.enrollStudent(studentId, courseId));
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getStudentEnrollments(@PathVariable String studentId) {
        return ResponseEntity.ok(enrollmentService.getStudentEnrollments(studentId));
    }
    
    @PutMapping("/{enrollmentId}/progress")
    public ResponseEntity<Enrollment> updateProgress(
            @PathVariable String enrollmentId,
            @RequestParam Integer progress) {
        return ResponseEntity.ok(enrollmentService.updateProgress(enrollmentId, progress));
    }
    
    @GetMapping("/course/{courseId}/count")
    public ResponseEntity<Long> getCourseEnrollmentCount(@PathVariable String courseId) {
        return ResponseEntity.ok(enrollmentService.getCourseEnrollmentCount(courseId));
    }
}
