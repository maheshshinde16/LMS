package com.lms.service;

import com.lms.model.Course;
import com.lms.model.Lesson;
import com.lms.repository.CourseRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    public Course getCourseById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
    
    public List<Course> getCoursesByInstructor(String instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }
    
    public List<Course> searchCourses(String keyword) {
        return courseRepository.searchByKeyword(keyword);
    }
    
    public List<String> getAllCategories() {
        return courseRepository.findAll().stream()
                .map(Course::getCategory)
                .filter(category -> category != null && !category.isEmpty())
                .distinct()
                .collect(Collectors.toList());
    }
    
    public Course createCourse(Course course, String instructorId) {
        var instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        
        course.setInstructorId(instructorId);
        course.setInstructorName(instructor.getName());
        course.setPublished(false);
        
        return courseRepository.save(course);
    }
    
    public Course updateCourse(String id, Course courseDetails) {
        Course course = getCourseById(id);
        
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setCategory(courseDetails.getCategory());
        course.setPrice(courseDetails.getPrice());
        course.setThumbnail(courseDetails.getThumbnail());
        course.setDuration(courseDetails.getDuration());
        
        if (courseDetails.getLessons() != null) {
            course.setLessons(courseDetails.getLessons());
        }
        
        return courseRepository.save(course);
    }
    
    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }
    
    public Course publishCourse(String id) {
        Course course = getCourseById(id);
        course.setPublished(true);
        return courseRepository.save(course);
    }
    
    public Course addLesson(String courseId, Lesson lesson) {
        Course course = getCourseById(courseId);
        lesson.setOrderIndex(course.getLessons().size());
        course.getLessons().add(lesson);
        return courseRepository.save(course);
    }
    
    public Course updateLesson(String courseId, int lessonIndex, Lesson lessonDetails) {
        Course course = getCourseById(courseId);
        
        if (lessonIndex >= 0 && lessonIndex < course.getLessons().size()) {
            Lesson lesson = course.getLessons().get(lessonIndex);
            lesson.setTitle(lessonDetails.getTitle());
            lesson.setContent(lessonDetails.getContent());
            lesson.setVideoUrl(lessonDetails.getVideoUrl());
            lesson.setDuration(lessonDetails.getDuration());
            
            return courseRepository.save(course);
        }
        
        throw new RuntimeException("Lesson not found");
    }
    
    public Course deleteLesson(String courseId, int lessonIndex) {
        Course course = getCourseById(courseId);
        
        if (lessonIndex >= 0 && lessonIndex < course.getLessons().size()) {
            course.getLessons().remove(lessonIndex);
            return courseRepository.save(course);
        }
        
        throw new RuntimeException("Lesson not found");
    }
}
