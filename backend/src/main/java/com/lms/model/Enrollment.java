package com.lms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "enrollments")
public class Enrollment {
    @Id
    private String id;
    
    private String studentId;
    private String courseId;
    private Integer progress;
    
    @CreatedDate
    private LocalDateTime enrolledAt;
}
