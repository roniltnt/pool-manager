package com.example.asgardchallenge.controller;

import com.example.asgardchallenge.model.Student;
import com.example.asgardchallenge.service.ScheduleResponse;
import com.example.asgardchallenge.service.SchedulingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pool")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PoolController {
    private final SchedulingService schedulingService;

    @PostMapping("/schedule")
    public ResponseEntity<ScheduleResponse> generateSchedule(@RequestBody List<Student> students) {
        ScheduleResponse response = schedulingService.scheduleLessons(students);

        return ResponseEntity.ok(response);
    }
}
