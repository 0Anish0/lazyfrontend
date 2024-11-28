import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import Host from "../../Host/Host";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        password: "",
        mobile: "",
        gender: "",
        country: "+91",
        city: "",
        state: "",
        live_image: null,
    });

    console.log(formData,"formData")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e) => {
        setFormData({ ...formData, live_image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            first_name,
            last_name,
            password,
            mobile,
            gender,
            country,
            city,
            state,
            live_image,
        } = formData;

        if (!live_image) {
            console.error("Live image is required");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("first_name", first_name);
        formDataToSend.append("last_name", last_name);
        formDataToSend.append("password", password);
        formDataToSend.append("mobile", mobile);
        formDataToSend.append("gender", gender);
        formDataToSend.append("country", country);
        formDataToSend.append("city", city);
        formDataToSend.append("state", state);
        formDataToSend.append("live_image", live_image);

        const response = await fetch(`${Host}/api/signup`, {
            method: "POST",
            body: formDataToSend,
        });

        const json = await response.json();
        console.log(json);

        if (json.token) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
            console.log("User created successfully");
        } else {
            console.error("Error creating account");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <img
                        src={Logo}
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
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
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
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Password and Number */}
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2 flex items-center border rounded-md overflow-hidden">
                            {/* Country Code Dropdown */}
                            <div className="flex items-center border-r pl-3">
                                <select
                                    name="country"
                                    value={formData.country || "+91"}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                                name="mobile"
                                placeholder="Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full px-3 py-2 outline-none"
                                required
                            />
                        </div>
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
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Gender</label>
                        <div className="flex items-center space-x-6 text-lg">
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleChange}
                                    className="text-green-700"
                                />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleChange}
                                    className="text-green-700"
                                />
                                <span>Female</span>
                            </label>
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="others"
                                    checked={formData.gender === "others"}
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
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                            required
                        >
                            <option value="">State</option>
                            <option value="State1">Uttar Pradesh</option>
                            <option value="State2">Bihar</option>
                        </select>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                            required
                        >
                            <option value="">City</option>
                            <option value="City1">Meerut</option>
                            <option value="City2">City2</option>
                        </select>
                    </div>

                    {/* Upload Photo */}
                    <div className="mb-6 text-center">
                        <label htmlFor="live_image" className="inline-block cursor-pointer">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                                <FontAwesomeIcon icon={faCamera} className="h-8 w-8" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="live_image"
                            accept="image/*"
                            capture="environment" // Use 'user' for the front camera
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