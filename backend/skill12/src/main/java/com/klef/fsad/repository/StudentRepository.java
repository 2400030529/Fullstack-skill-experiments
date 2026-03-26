package com.klef.fsad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.fsad.model.Student;

// This interface connects your Student entity to the database
public interface StudentRepository extends JpaRepository<Student, Long> {
}