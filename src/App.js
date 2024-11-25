import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./Client/Pages/signUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;