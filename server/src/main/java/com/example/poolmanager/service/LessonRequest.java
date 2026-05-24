package com.example.asgardchallenge.service;

import com.example.asgardchallenge.model.Student;
import com.example.asgardchallenge.model.SwimmingStyle;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LessonRequest {
    private List<Student> students;
    private SwimmingStyle swimmingStyle;
    private int durationInMinutes;
    private boolean isGroup;
    private String preferredTeacher;
}
