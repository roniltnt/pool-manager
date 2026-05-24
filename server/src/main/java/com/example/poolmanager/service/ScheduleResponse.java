package com.example.asgardchallenge.service;

import com.example.asgardchallenge.model.ScheduledLesson;
import com.example.asgardchallenge.model.Student;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ScheduleResponse {
    private List<ScheduledLesson> scheduledLessons;
    private List<Student> unassignedStudents;
}
