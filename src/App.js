import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Client/Pages/SignIn";
import Dashboard from "./Admin/Pages/Dashboard";
import AdminState from "./Context/AdminState";
import UserTable from "./Admin/Pages/UserTable";
import AdminSignIn from "./Admin/Pages/AdminSignIn";
import Home from "./Client/Pages/Home";
import HomeLayout from "./Client/Components/HomeLayout";
import MyAds from "./Client/Pages/MyAds";
import Response from "./Client/Pages/Response";
import ViewUser from "./Admin/Pages/ViewUser";

function App() {
  return (
    <AdminState>
      <Router>
        <Routes>
          {/* admin */}
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-list" element={<UserTable />} />
          <Route path="/admin/user-list/:pathName" element={<ViewUser />} />
          {/* client */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />  {/* Default page */}
            <Route path="my-ads" element={<MyAds />} />
            <Route path="response" element={<Response />} />
          </Route>
          <Route path="/log-in" element={<SignIn />} />
        </Routes>
      </Router>
    </AdminState>
  );
}

export default App;