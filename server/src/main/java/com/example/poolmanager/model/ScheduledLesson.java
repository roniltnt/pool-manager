package com.example.asgardchallenge.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduledLesson {
    private String teacherName;
    private List<Student> students;
    private DayOfWeek day;
    private LocalTime startTime;
    private LocalTime endTime;
    private SwimmingStyle swimmingStyle;
    private boolean isGroupLesson;
}
