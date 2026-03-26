import React, { useState } from "react";
import axios from "axios";

function AddStudent({ refreshStudents, selectedStudent, setSelectedStudent }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: ""
  });

  // Fill form when updating
  React.useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (student.id) {
      // UPDATE
      axios.put(`http://localhost:8080/students/${student.id}`, student)
        .then(() => {
          refreshStudents();
          setStudent({ name: "", email: "", course: "" });
          setSelectedStudent(null);
        });
    } else {
      // ADD
      axios.post("http://localhost:8080/students", student)
        .then(() => {
          refreshStudents();
          setStudent({ name: "", email: "", course: "" });
        });
    }
  };

  return (
    <div>
      <h2>{student.id ? "Update Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {student.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;