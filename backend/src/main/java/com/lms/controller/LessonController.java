package com.lms.controller;

import com.lms.model.Course;
import com.lms.model.Lesson;
import com.lms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {
    
    @Autowired
    private CourseService courseService;
    
    @PostMapping("/course/{courseId}")
    public ResponseEntity<Course> addLesson(@PathVariable String courseId, @RequestBody Lesson lesson) {
        return ResponseEntity.ok(courseService.addLesson(courseId, lesson));
    }
    
    @PutMapping("/course/{courseId}/{lessonIndex}")
    public ResponseEntity<Course> updateLesson(
            @PathVariable String courseId,
            @PathVariable int lessonIndex,
            @RequestBody Lesson lesson) {
        return ResponseEntity.ok(courseService.updateLesson(courseId, lessonIndex, lesson));
    }
    
    @DeleteMapping("/course/{courseId}/{lessonIndex}")
    public ResponseEntity<Course> deleteLesson(
            @PathVariable String courseId,
            @PathVariable int lessonIndex) {
        return ResponseEntity.ok(courseService.deleteLesson(courseId, lessonIndex));
    }
}
