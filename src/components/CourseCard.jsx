import React from "react";

import { useNavigate } from "react-router-dom";

const CourseCard = ({ id, title, description }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => navigate(`/course/${id}`)}>View Course</button>
    </div>
  );
};

export default CourseCard;

