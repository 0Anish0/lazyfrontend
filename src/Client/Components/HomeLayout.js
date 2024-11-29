import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Assuming your sidebar is in a separate component
import Header from "../../Admin/Components/Header";
import AdminContext from "../../Context/AdminContext";

const HomeLayout = () => {
    const context = useContext(AdminContext);
    const { getAllUsers } = context;
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllUsers();
        } else {
            history("/log-in");
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className="flex bg-gray-100">
            <div className="w-1/5 bg-white shadow-md p-4 border-t-2 border-r-2 flex flex-col h-screen">
            <Sidebar />  {/* The sidebar stays the same */}
            </div>
            <div className="flex-1 p-6 mt-24">
                <Header />
                <Outlet />  {/* Render nested route components here */}
            </div>
        </div>
    );
};

export default HomeLayout;