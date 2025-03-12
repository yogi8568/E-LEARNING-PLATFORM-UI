import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";


const CourseDropdown = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <div>
      <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select a Course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
      {selectedCourse && (
        <Link to={`/course/${selectedCourse}`} style={{ marginLeft: "10px" }}>
          Go to Course
        </Link>
      )}
    </div>
  );
};

export default CourseDropdown;
