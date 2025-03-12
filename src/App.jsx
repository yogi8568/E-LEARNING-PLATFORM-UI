import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ELearning from "./pages/ELearning";
import CoursePage from "./pages/CoursePage";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    color: white;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const Nav = styled.nav`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Router>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/course/1">Course 1</NavLink>
          <NavLink to="/course/2">Course 2</NavLink>
        </Nav>
        <Routes>
          <Route path="/" element={<ELearning />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

export default App;