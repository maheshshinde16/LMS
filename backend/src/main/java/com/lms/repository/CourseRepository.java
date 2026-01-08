package com.lms.repository;

import com.lms.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByInstructorId(String instructorId);
    List<Course> findByPublished(Boolean published);
    
    @Query("{ $or: [ { 'title': { $regex: ?0, $options: 'i' } }, { 'description': { $regex: ?0, $options: 'i' } } ] }")
    List<Course> searchByKeyword(String keyword);
    
    @Query(value = "{}", fields = "{ 'category': 1 }")
    List<Course> findAllCategories();
}
