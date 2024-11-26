import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./Client/Pages/signUp";
import SignIn from "./Client/Pages/SignIn";
import ForgetPwd from "./Client/Pages/ForgetPwd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/forget-password" element={<ForgetPwd />} />
      </Routes>
    </Router>
  );
}

export default App;