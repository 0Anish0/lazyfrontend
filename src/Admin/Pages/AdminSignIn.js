import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import Host from "../../Host/Host";

const AdminSignIn = () => {
    const [message, setMessage] = useState(false);

    const [credentials, setCredentials] = useState({ mobile: "", password: "" });
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${Host}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mobile: credentials.mobile,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        // console.log(json);
        if (json.token) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.token);
            // props.showAlert("Logedin successfully", "success")
            console.log("login successful");
            history("/admin/dashboard");
        } else {
            console.log("error");
            setMessage(true);
            // props.showAlert("Invalid Details", "danger")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
                    <img className="mx-auto w-2/5" src={logo} alt="lzycrazy" />
                </div>
                <div className="">
                    <div className="">
                        <div className="m-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {message && <p>Please Enter Correct Information</p>}
                                <div className="flex items-center border rounded-md overflow-hidden">
                                    {/* Phone Number Input */}
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Mobile"
                                        value={credentials.mobile}
                                        onChange={onChange}
                                        className="w-full px-3 py-2 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center px-4 py-2 border rounded-md focus-within:ring-2 focus-within:ring-green-400">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="text-gray-400 mr-3"
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={credentials.password}
                                            onChange={onChange}
                                            className="w-full outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignIn;
