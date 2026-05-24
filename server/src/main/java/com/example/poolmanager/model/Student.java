package com.example.asgardchallenge.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private String firstName;
    private String lastName;
    private SwimmingStyle requestedStyle;
    private LessonPreference lessonPreference;
    private String preferredTeacher;
}
