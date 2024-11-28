import React from 'react';
import logo from "../../Assets/logo.png";

const Header = ({ userId }) => {
    return (
        <div className="fixed top-0 left-0 w-full mb-8 flex justify-between items-center bg-white border-b-4 px-4">
            <img src={logo} alt="Logo" className="w-32 h-20 ml-7" />
            <div className="items-center space-x-2 mr-7 p-3">
                <div className="w-10 h-10 bg-gray-400 rounded-full ml-10"></div>
                <span className="font-medium text-gray-600">ID: Lc45789422</span>
            </div>
        </div>
    );
};

export default Header;