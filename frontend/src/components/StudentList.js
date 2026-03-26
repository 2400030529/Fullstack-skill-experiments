import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "./AddStudent";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // GET all students
  const fetchStudents = () => {
    axios.get("http://localhost:8080/students")
      .then((res) => {
        setStudents(res.data);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // DELETE student
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:8080/students/${id}`)
      .then(() => {
        fetchStudents();
      });
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <AddStudent
        refreshStudents={fetchStudents}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      <h2>Student List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>

              <td>
                <button onClick={() => setSelectedStudent(student)}>
                  Update
                </button>

                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;