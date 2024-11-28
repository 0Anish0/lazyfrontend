import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import {
  faHome,
  faUser,
  faCog,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Host from "../../Host/Host";

const SignIn = (props) => {
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

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
      localStorage.setItem("token", json.authToken);
      // props.showAlert("Logedin successfully", "success")
      console.log("login successful");
      history("/dashboard");
    } else {
      console.log("error");
      setMessage(true)
      // props.showAlert("Invalid Details", "danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

  const handleForgetPwd = () => {
    navigate("/forget-password");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="items-center justify-center bg-gray-50 w-full px-8 lg:px-12 lg:mx-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-2/5" src={logo} alt="lzycrazy" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6 my-10">
          <div className="relative">
            {/* Search Icon */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full rounded-2xl border-0 py-2 pl-10 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FontAwesomeIcon icon={faMicrophone} className="text-gray-400" />
            </span>
          </div>
        </div>

        <div className="flex justify-between w-full max-w-8xl gap-6">
          <div className="flex justify-center items-center mr-10 bg-white shadow rounded-2xl w-3/5">
            <video controls className="h-full w-full rounded-2xl">
              <source
                src="https://res.cloudinary.com/dfv1qnzoz/video/upload/v1719039250/gh211amrhepwgubdirem.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="bg-white p-8 rounded-md shadow-lg ml-10 w-2/5 flex flex-col justify-center items-center">
            <div className="m-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {message && <p>Please Enter Correct Information</p>}
                <div className="flex items-center border rounded-md overflow-hidden">
                  {/* Country Code Dropdown */}
                  <div className="flex items-center border-r pl-3">
                    <select
                      name="countryCode"
                      value={credentials.countryCode || "+91"}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          countryCode: e.target.value,
                        })
                      }
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
                <p
                  className="text-center pb-3 text-blue-600"
                  onClick={handleForgetPwd}
                >
                  Forget Password?
                </p>
              </form>
              <span className="border-b-2 w-full flex"></span>
              <div>
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="w-full bg-green-700 text-white py-2 mt-5 rounded-md hover:bg-green-800"
                >
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12 relative">
          <div className="text-center px-10">
            <div className="flex justify-center items-center bg-black text-white rounded-full w-12 h-12 mx-auto mb-2">
              <FontAwesomeIcon icon={faHome} className="text-1xl" />
            </div>
            <div>Home</div>
          </div>
          <div className="text-center px-10">
            <div className="flex justify-center items-center bg-black text-white rounded-full w-12 h-12 mx-auto mb-2">
              <FontAwesomeIcon icon={faUser} className="text-1xl" />
            </div>
            <div>User</div>
          </div>
          <div className="text-center px-10">
            <div className="flex justify-center items-center bg-black text-white rounded-full w-12 h-12 mx-auto mb-2">
              <FontAwesomeIcon icon={faCog} className="text-1xl" />
            </div>
            <div>Settings</div>
          </div>
          <div className="text-center px-10">
            <div className="flex justify-center items-center bg-black text-white rounded-full w-12 h-12 mx-auto mb-2">
              <FontAwesomeIcon icon={faInfoCircle} className="text-1xl" />
            </div>
            <div>Info</div>
          </div>
          <span className="absolute left-0 bottom-0">🇮🇳 India</span>
        </div>

        <div className="flex items-center justify-end border-t-2 mt-5">
          <ul className="flex items-center justify-center gap-8 mt-3">
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/about"}>Privacy</Link>
            </li>
            <li>
              <Link to={"/about"}>Teams</Link>
            </li>
            <li>
              <Link to={"/about"}>Help</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
