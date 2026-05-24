package com.example.asgardchallenge.config;

import com.example.asgardchallenge.model.*;
import com.example.asgardchallenge.repository.TeacherRepository; // ודא שהנתיב פה תואם לאיפה ששמת את ה-Repository
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(TeacherRepository teacherRepository) {
        return args -> {
            if (teacherRepository.count() == 0) {

                Teacher yotam = new Teacher("Yotam",
                        Set.of(SwimmingStyle.FREESTYLE, SwimmingStyle.BREASTSTROKE, SwimmingStyle.BUTTERFLY, SwimmingStyle.BACKSTROKE),
                        new ArrayList<>(List.of(
                                new TimeWindow(DayOfWeek.MONDAY, LocalTime.of(16, 0), LocalTime.of(20, 0)),
                                new TimeWindow(DayOfWeek.THURSDAY, LocalTime.of(16, 0), LocalTime.of(20, 0))
                        ))
                );

                Teacher yoni = new Teacher("Yoni",
                        Set.of(SwimmingStyle.BREASTSTROKE, SwimmingStyle.BUTTERFLY),
                        new ArrayList<>(List.of(
                                new TimeWindow(DayOfWeek.TUESDAY, LocalTime.of(8, 0), LocalTime.of(15, 0)),
                                new TimeWindow(DayOfWeek.WEDNESDAY, LocalTime.of(8, 0), LocalTime.of(15, 0)),
                                new TimeWindow(DayOfWeek.THURSDAY, LocalTime.of(8, 0), LocalTime.of(15, 0))
                        ))
                );

                Teacher johnny = new Teacher("Johnny",
                        Set.of(SwimmingStyle.FREESTYLE, SwimmingStyle.BREASTSTROKE, SwimmingStyle.BUTTERFLY, SwimmingStyle.BACKSTROKE),
                        new ArrayList<>(List.of(
                                new TimeWindow(DayOfWeek.SUNDAY, LocalTime.of(10, 0), LocalTime.of(19, 0)),
                                new TimeWindow(DayOfWeek.TUESDAY, LocalTime.of(10, 0), LocalTime.of(19, 0)),
                                new TimeWindow(DayOfWeek.THURSDAY, LocalTime.of(10, 0), LocalTime.of(19, 0))
                        ))
                );

                teacherRepository.saveAll(List.of(yotam, yoni, johnny));
                System.out.println("Database successfully populated with initial teachers data.");
            } else {
                System.out.println("Database already contains data. Skipping seeding.");
            }
        };
    }
}