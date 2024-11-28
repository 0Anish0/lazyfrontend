import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./Client/Pages/signUp";
import SignIn from "./Client/Pages/SignIn";
import ForgetPwd from "./Client/Pages/ForgetPwd";
import Dashboard from "./Dashboard/Pages/Dashboard";
import AdminState from "./Context/AdminState";

function App() {
  return (
    <AdminState>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/forget-password" element={<ForgetPwd />} />
        </Routes>
      </Router>
    </AdminState>
  );
}

export default App;