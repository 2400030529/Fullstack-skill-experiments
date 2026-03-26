package com.klef.fsad.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.klef.fsad.model.Student;
import com.klef.fsad.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student addStudent(Student s) {
        return repo.save(s);
    }

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    public Student updateStudent(Long id, Student s) {
        Student existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        existing.setName(s.getName());
        existing.setEmail(s.getEmail());
        existing.setCourse(s.getCourse());
        return repo.save(existing);
    }

    public void deleteStudent(Long id) {
        repo.deleteById(id);
    }
}