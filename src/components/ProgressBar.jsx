import styled from "styled-components";
import React from "react";

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 5px;
  margin: 10px 0;
`;

const ProgressFill = styled.div`
  height: 10px;
  width: ${(props) => props.$progress}%;
  background-color: green;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressContainer>
      <ProgressFill $progress={progress} />
    </ProgressContainer>
  );
};

export default ProgressBar;
