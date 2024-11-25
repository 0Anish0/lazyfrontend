import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        number: "",
        gender: "",
        locationCity: "",
        locationState: "",
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-12 mx-auto"
                    />
                    <h2 className="text-lg font-bold mt-2">Create New Account</h2>
                    <p className="text-gray-500 text-sm">Don't spoil your Lzycrazy ID</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-4 mb-4">
                        {/* First Name */}
                        <div className="flex items-center w-1/2 px-4 py-2 border rounded-md focus-within:ring-2 focus-within:ring-green-400">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3" />
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full outline-none"
                                required
                            />
                        </div>
                        {/* Last Name */}
                        <div className="flex items-center w-1/2 px-4 py-2 border rounded-md focus-within:ring-2 focus-within:ring-green-400">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3" />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Password and Number */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex items-center w-1/2 px-4 py-2 border rounded-md focus-within:ring-2 focus-within:ring-green-400">
                            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full outline-none"
                                required
                            />
                        </div>
                        <div className="w-1/2 flex items-center border rounded-md overflow-hidden">
                            {/* Country Code Dropdown */}
                            <div className="flex items-center border-r pl-3">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode || "+91"}
                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                    className="text-gray-600 outline-none emoji appearance-none bg-transparent"
                                    required
                                >
                                    <option value="+91">🇮🇳 +91</option>
                                    <option value="+880">🇧🇩 +880</option>
                                    <option value="+977">🇳🇵 +977</option>
                                </select>
                            </div>

                            {/* Phone Number Input */}
                            <input
                                type="tel"
                                name="number"
                                placeholder="Number"
                                value={formData.number}
                                onChange={handleChange}
                                className="w-full px-3 py-2 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Gender</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                    className="text-green-700"
                                />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                    className="text-green-700"
                                />
                                <span>Female</span>
                            </label>
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Others"
                                    checked={formData.gender === "Others"}
                                    onChange={handleChange}
                                    className="text-green-700"
                                />
                                <span>Others</span>
                            </label>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex space-x-4 mb-4">
                        <select
                            name="locationCity"
                            value={formData.locationCity}
                            onChange={handleChange}
                            className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                            required
                        >
                            <option value="">City</option>
                            <option value="City1">City1</option>
                            <option value="City2">City2</option>
                        </select>
                        <select
                            name="locationState"
                            value={formData.locationState}
                            onChange={handleChange}
                            className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                            required
                        >
                            <option value="">State</option>
                            <option value="State1">State1</option>
                            <option value="State2">State2</option>
                        </select>
                    </div>

                    {/* Upload Photo */}
                    <div className="mb-6 text-center">
                        <label htmlFor="photo" className="inline-block cursor-pointer">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                                <FontAwesomeIcon icon={faCamera} className="h-8 w-8" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="photo"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-xs text-gray-500 mt-4">
                    By clicking Sign Up, you agree to our{" "}
                    <span className="text-green-700">Term Privacy Policy</span> and{" "}
                    <span className="text-green-700">Cookies Policy</span>.
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;