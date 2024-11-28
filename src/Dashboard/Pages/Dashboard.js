import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faList,
    faAddressBook,
    faShop,
    faFlag,
    faUsers,
    faClipboardList,
    faEnvelope,
    faUserPlus,
    faSignOutAlt,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import Header from "../Components/header";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../Context/AdminContext";

const Dashboard = () => {
    const context = useContext(AdminContext);
  const { notes, getAllUsers} = context;

    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllUsers()
        }
        else {
            history("/log-in")
        }
        // eslint-disable-next-line
    }, []);

    console.log(notes,"data")

    const handleLogout = () => {
        localStorage.removeItem("token");
        history("/log-in");
    };

    const [expandedCategory, setExpandedCategory] = useState(null);
    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };
    return (
        <div className="flex bg-gray-100">
            <div className="w-1/5 bg-white shadow-md p-4 border-t-2 border-r-2 flex flex-col">
                <Header />
                {/* Sidebar Links */}
                <ul className="w-full mt-24">
                    {[
                        { icon: faTachometerAlt, label: "Dashboard" },
                        {
                            icon: faList,
                            label: "Category",
                            subcategories: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
                        },
                        { icon: faAddressBook, label: "Address" },
                        { icon: faShop, label: "Shop" },
                        { icon: faFlag, label: "Banner" },
                        { icon: faUsers, label: "All Users" },
                        { icon: faProductHunt, label: "Products" },
                        {
                            icon: faClipboardList,
                            label: "Posts",
                            subcategories: ["Drafts", "Published", "Archived"],
                        },
                        { icon: faEnvelope, label: "Client Enquiry" },
                        { icon: faUserPlus, label: "Join Team" },
                        { icon: faSignOutAlt, label: "Log Out", onClick: handleLogout },
                    ].map((item, index) => (
                        <li key={index} className="mb-2">
                            <div
                                className={`py-3 px-2 border-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer flex items-center justify-between ${item.subcategories ? "border" : ""
                                    }`}
                                onClick={() =>
                                {
                                    if (item.onClick) {
                                        item.onClick(); // Call the specific onClick handler if it exists
                                    } else if (item.subcategories) {
                                        toggleCategory(item.label); // Toggle subcategories for items with subcategories
                                    }
                                }
                                }
                            >
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                    {item.label}
                                </span>
                                {item.subcategories && (
                                    <FontAwesomeIcon
                                        icon={
                                            expandedCategory === item.label
                                                ? faChevronUp
                                                : faChevronDown
                                        }
                                    />
                                )}
                            </div>
                            {/* Subcategories */}
                            {item.subcategories && expandedCategory === item.label && (
                                <ul className="ml-6 mt-2">
                                    {item.subcategories.map((subcategory, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className="py-2 px-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
                                        >
                                            {subcategory}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-6 mt-24">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold">Dashboard</h2>
                        <select
                            className="ml-4 border rounded-md py-2 px-4 text-gray-600 bg-white"
                            defaultValue="Country"
                        >
                            <option value="Country" disabled>
                                Country
                            </option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>
                </div>
                <div className="flex">
                    <div className="grid grid-cols-1 gap-4 w-1/4">
                        {[
                            { title: "Total Users", value: 123 },
                            { title: "ADs", value: 123 },
                            { title: "Business Profile", value: 123 },
                            { title: "Advertising List", value: 123 },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 shadow-md rounded-md text-center border"
                            >
                                <h3 className="text-xl font-semibold">{stat.title}</h3>
                                <p className="text-blue-600 text-2xl font-bold mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 pl-4">
                        <div className="grid grid-cols-3 gap-4 mb-6 border-2 bg-white p-4 rounded-md">
                            <select
                                className="border rounded-md py-2 px-4 text-gray-600 bg-white"
                                defaultValue="State"
                            >
                                <option value="State" disabled>
                                    State
                                </option>
                                <option value="State 1">State 1</option>
                                <option value="State 2">State 2</option>
                            </select>
                            <select
                                className="border rounded-md py-2 px-4 text-gray-600 bg-white"
                                defaultValue="City"
                            >
                                <option value="City" disabled>
                                    City
                                </option>
                                <option value="City 1">City 1</option>
                                <option value="City 2">City 2</option>
                            </select>
                            <select
                                className="border rounded-md py-2 px-4 text-gray-600 bg-white"
                                defaultValue="Monthly"
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="h-96 bg-green-100 flex justify-center items-center rounded-md border">
                            <p className="text-gray-500">[Insert Chart Here]</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;