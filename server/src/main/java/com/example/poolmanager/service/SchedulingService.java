package com.example.asgardchallenge.service;

import com.example.asgardchallenge.model.*;
import com.example.asgardchallenge.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.util.*;

@Service
public class SchedulingService {
    private final TeacherRepository teacherRepository;

    public SchedulingService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public ScheduleResponse scheduleLessons(List<Student> students) {
        List<ScheduledLesson> scheduledLessons = new ArrayList<>();
        List<Student> unassignedStudents = new ArrayList<>();

        List<Teacher> memoryTeachers = getTeachersFromDbAsDeepCopy();
        List<LessonRequest> requests = createLessonRequest(students, unassignedStudents);
        sortRequestsPriority(requests);

        Map<String, Integer> totalLoad = new HashMap<>();
        Map<String, Map<DayOfWeek, Integer>> dailyLoad = new HashMap<>();
        initializeLoadTracking(memoryTeachers, totalLoad, dailyLoad);

        for (LessonRequest request : requests) {
            BestSlot bestSlot = findBestSlotForRequest(request, memoryTeachers, totalLoad, dailyLoad);

            if (bestSlot != null) {
                ScheduledLesson newLesson = assignLessonAndUpdateLoad(request, bestSlot, totalLoad, dailyLoad);
                scheduledLessons.add(newLesson);
            } else {
                unassignedStudents.addAll(request.getStudents());
            }
        }

        return new ScheduleResponse(scheduledLessons, unassignedStudents);
    }

    private List<Teacher> getTeachersFromDbAsDeepCopy() {
        List<Teacher> dbTeachers = teacherRepository.findAll();
        List<Teacher> memoryTeachers = new ArrayList<>();

        for (Teacher dbTeacher : dbTeachers) {
            List<TimeWindow> copiedWindows = new ArrayList<>();
            for (TimeWindow w : dbTeacher.getAvailability()) {
                copiedWindows.add(new TimeWindow(w.getDay(), w.getStartTime(), w.getEndTime()));
            }
            memoryTeachers.add(new Teacher(dbTeacher.getName(), dbTeacher.getSupportedStyles(), copiedWindows));
        }
        return memoryTeachers;
    }

    private void initializeLoadTracking(List<Teacher> teachers, Map<String, Integer> totalLoad, Map<String, Map<DayOfWeek, Integer>> dailyLoad) {
        for (Teacher teacher : teachers) {
            totalLoad.put(teacher.getName(), 0);
            dailyLoad.put(teacher.getName(), new EnumMap<>(DayOfWeek.class));
            for (DayOfWeek d : DayOfWeek.values()) {
                dailyLoad.get(teacher.getName()).put(d, 0);
            }
        }
    }

    private static class BestSlot {
        Teacher teacher;
        TimeWindow window;

        BestSlot(Teacher teacher, TimeWindow window) {
            this.teacher = teacher;
            this.window = window;
        }
    }

    private BestSlot findBestSlotForRequest(LessonRequest request, List<Teacher> teachers, Map<String, Integer> totalLoad, Map<String, Map<DayOfWeek, Integer>> dailyLoad) {
        Teacher bestTeacher = null;
        TimeWindow bestWindow = null;
        int lowestLoadScore = Integer.MAX_VALUE;

        for (Teacher teacher : teachers) {
            if (!"ANY".equals(request.getPreferredTeacher()) && !teacher.getName().equalsIgnoreCase(request.getPreferredTeacher())) {
                continue;
            }

            if (teacher.getSupportedStyles().contains(request.getSwimmingStyle())) {
                for (TimeWindow window : teacher.getAvailability()) {
                    long availableMinutes = Duration.between(window.getStartTime(), window.getEndTime()).toMinutes();

                    if (availableMinutes >= request.getDurationInMinutes()) {
                        int currentScore = totalLoad.get(teacher.getName()) +
                                dailyLoad.get(teacher.getName()).get(window.getDay());

                        if (currentScore < lowestLoadScore) {
                            lowestLoadScore = currentScore;
                            bestTeacher = teacher;
                            bestWindow = window;
                        }
                    }
                }
            }
        }

        if (bestTeacher != null && bestWindow != null) {
            return new BestSlot(bestTeacher, bestWindow);
        }
        return null;
    }

    private ScheduledLesson assignLessonAndUpdateLoad(LessonRequest request, BestSlot bestSlot, Map<String, Integer> totalLoad, Map<String, Map<DayOfWeek, Integer>> dailyLoad) {
        Teacher teacher = bestSlot.teacher;
        TimeWindow window = bestSlot.window;

        ScheduledLesson lesson = new ScheduledLesson(
                teacher.getName(), request.getStudents(),
                window.getDay(), window.getStartTime(),
                window.getStartTime().plusMinutes(request.getDurationInMinutes()),
                request.getSwimmingStyle(), request.isGroup()
        );

        window.setStartTime(window.getStartTime().plusMinutes(request.getDurationInMinutes()));

        totalLoad.put(teacher.getName(), totalLoad.get(teacher.getName()) + request.getDurationInMinutes());
        dailyLoad.get(teacher.getName()).put(window.getDay(),
                dailyLoad.get(teacher.getName()).get(window.getDay()) + request.getDurationInMinutes());

        return lesson;
    }

    private List<LessonRequest> createLessonRequest(List<Student> students, List<Student> unassignedStudents) {
        List<LessonRequest> requests = new ArrayList<>();

        Map<String, List<Student>> groupCandidates = new HashMap<>();

        for (Student student : students) {
            String prefTeacher = (student.getPreferredTeacher() == null || student.getPreferredTeacher().isEmpty()) ? "ANY" : student.getPreferredTeacher();

            if (student.getLessonPreference() == LessonPreference.PRIVATE_ONLY) {
                requests.add(new LessonRequest(List.of(student), student.getRequestedStyle(), 45, false, prefTeacher));
            } else {
                String key = student.getRequestedStyle() + "_" + prefTeacher;
                groupCandidates.computeIfAbsent(key, k -> new ArrayList<>()).add(student);
            }
        }

        final int MAX_GROUP_SIZE = 4;

        for (Map.Entry<String, List<Student>> entry : groupCandidates.entrySet()) {
            List<Student> styleStudents = entry.getValue();

            String[] keyParts = entry.getKey().split("_");
            SwimmingStyle swimmingStyle = SwimmingStyle.valueOf(keyParts[0]);
            String prefTeacher = keyParts.length > 1 ? keyParts[1] : "ANY";

            prioritizeGroupOnlyStudents(styleStudents);

            for (int i = 0; i < styleStudents.size(); i += MAX_GROUP_SIZE) {
                List<Student> chunk = styleStudents.subList(i, Math.min(i + MAX_GROUP_SIZE, styleStudents.size()));

                if (chunk.size() == 1) {
                    Student singleStudent = chunk.get(0);
                    if (singleStudent.getLessonPreference() == LessonPreference.GROUP_ONLY) {
                        unassignedStudents.add(singleStudent);
                    } else {
                        requests.add(new LessonRequest(chunk, swimmingStyle, 45, false, prefTeacher));
                    }
                } else {
                    requests.add(new LessonRequest(chunk, swimmingStyle, 60, true, prefTeacher));
                }
            }
        }
        return requests;
    }

    private void sortRequestsPriority(List<LessonRequest> requests) {
        requests.sort((r1, r2) -> {
            boolean r1NeedsGeneralist = (r1.getSwimmingStyle() == SwimmingStyle.FREESTYLE || r1.getSwimmingStyle() == SwimmingStyle.BACKSTROKE);
            boolean r2NeedsGeneralist = (r2.getSwimmingStyle() == SwimmingStyle.FREESTYLE || r2.getSwimmingStyle() == SwimmingStyle.BACKSTROKE);

            if (r1NeedsGeneralist && !r2NeedsGeneralist) return -1;
            if (!r1NeedsGeneralist && r2NeedsGeneralist) return 1;

            return Boolean.compare(r2.isGroup(), r1.isGroup());
        });
    }

    private void prioritizeGroupOnlyStudents(List<Student> styleStudents) {
        styleStudents.sort((s1, s2) -> {
            if (s1.getLessonPreference() == LessonPreference.GROUP_ONLY && s2.getLessonPreference() == LessonPreference.ANY) return -1;
            if (s1.getLessonPreference() == LessonPreference.ANY && s2.getLessonPreference() == LessonPreference.GROUP_ONLY) return 1;
            return 0;
        });
    }
}
