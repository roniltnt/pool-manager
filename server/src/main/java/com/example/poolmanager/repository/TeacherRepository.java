package com.example.asgardchallenge.repository; // או model, תלוי איפה שמת את זה

import com.example.asgardchallenge.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    // save, findAll, findById, count, delete
}