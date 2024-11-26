import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../Assets/logo.png";

const ForgetPwd = () => {
  const [formData, setFormData] = useState({
    number: "",
    photo: null,
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
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

  //   OTP process
  const defaultOtp = "12345";
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleOTP = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return;

    // Update the OTP array at the given index
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    if (value === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }

    // Check if the entered OTP matches the default OTP
    const enteredOtp = newOtp.join("");
    if (enteredOtp === defaultOtp) {
      setIsOtpValid(true); // Set OTP as valid
      setErrorOTP(false);
    } else {
      setErrorOTP(true);
      setIsOtpValid(false); // Set OTP as invalid
    }
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 5) {
      setPasswordError("Password must be at least 6 characters long.");
    }
    if (newPassword === defaultOtp) {
      setPasswordError("Please Enter Different Password");
    } else {
      setPasswordError("");
      alert("Password changed successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src={Logo} alt="Logo" className="h-12 mx-auto" />
          <p className="text-green-700 mt-3 text-sm">Forget Password</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Password and Number */}
          <div className="flex space-x-4 mb-4">
            <div className="w-full flex items-center border rounded-md overflow-hidden">
              {/* Country Code Dropdown */}
              <div className="flex items-center border-r pl-3">
                <select
                  name="countryCode"
                  value={formData.countryCode || "+91"}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
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
                name="number"
                placeholder="Number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Upload Photo */}
          <div className="mb-6 text-center">
            <label htmlFor="photo" className="inline-block cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                <FontAwesomeIcon icon={faCamera} className="h-8 w-8" />
              </div>
            </label>
            <p className="mt-2">Upload Live Photo</p>
            <input
              type="file"
              id="photo"
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
            Send OTP
          </button>
        </form>
        <div className="flex justify-center items-center">
          <div className="mt-5 w-full">
            <p className="  mb-4">Enter OTP</p>
            <div className="flex justify-between space-x-2 w-full">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTP(e, index)}
                  className="w-full h-16 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>
            {errorOTP && <p>Wrong OTP Please Enter Correct OTP</p>}

            {/* Show Create New Password box if OTP is valid */}
            {isOtpValid && (
              <div className="mt-6">
                <h3 className="mb-4">Create New Password</h3>
                <form onSubmit={handleSubmitPassword}>
                  <div className="flex items-center w-full px-4 py-2 border rounded-md focus-within:ring-2 focus-within:ring-green-400">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-400 mr-3"
                    />
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
                  <br />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                  <button
                    type="submit"
                    className="mt-4 w-full h-12 bg-blue-700 text-white font-semibold rounded-md"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPwd;
