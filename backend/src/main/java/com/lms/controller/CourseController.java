package com.lms.controller;

import com.lms.model.Course;
import com.lms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    
    @Autowired
    private CourseService courseService;
    
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }
    
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Course>> getCoursesByInstructor(@PathVariable String instructorId) {
        return ResponseEntity.ok(courseService.getCoursesByInstructor(instructorId));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam String keyword) {
        return ResponseEntity.ok(courseService.searchCourses(keyword));
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(courseService.getAllCategories());
    }
    
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course, @RequestParam String instructorId) {
        return ResponseEntity.ok(courseService.createCourse(course, instructorId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course course) {
        return ResponseEntity.ok(courseService.updateCourse(id, course));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/publish")
    public ResponseEntity<Course> publishCourse(@PathVariable String id) {
        return ResponseEntity.ok(courseService.publishCourse(id));
    }
}
