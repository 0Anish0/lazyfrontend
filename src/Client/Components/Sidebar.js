import React from 'react'
import {
    faTachometerAlt,
    faAddressBook,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Sidebar = () => {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        history("/log-in");
    };

   
    return (
        <ul className="w-full mt-24">
            {[
                { icon: faTachometerAlt, label: "My Ads", path: "/my-ads" },
                { icon: faAddressBook, label: "Response", path: "/response" },
                { icon: faSignOutAlt, label: "Log Out", path: "/log-in", onClick: handleLogout },
            ].map((item, index) => (
                <li key={index} className="mb-2">
                    <div
                        className={`py-3 px-2 border-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer flex items-center justify-between`}
                        onClick={() => {
                            if (item.onClick) {
                                item.onClick();
                            } else {
                                history(item.path);  // Navigate to the page
                            }
                        }}
                    >
                        <span className="flex items-center">
                            <FontAwesomeIcon icon={item.icon} className="mr-2" />
                            {item.label}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Sidebar
