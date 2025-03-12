import styled from "styled-components";

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export default Button;
