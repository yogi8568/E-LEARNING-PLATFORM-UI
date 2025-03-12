import CourseDropdown from "../components/CourseDropdown";
import React from "react";


const courses = [
  { id: "1", title: "React Basics" },
  { id: "2", title: "Advanced JavaScript" },
];

const ELearning = () => {
  return (
    <div style={{ color: "black" }}> {/* Ensures text is black */}
      <h1>Available Courses</h1>
      <CourseDropdown courses={courses} />
    </div>
  );
};





export default ELearning;
