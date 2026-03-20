package com.klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klu.entity.Student;
import com.klu.exception.InvalidInputException;
import com.klu.exception.StudentNotFoundException;
import com.klu.repository.StudentRepository;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        Long studentId;
        try {
            studentId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new InvalidInputException("Invalid student ID: must be a number");
        }

        return studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));
    }

    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
}