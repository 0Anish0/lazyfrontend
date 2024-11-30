import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import Host from "../../Host/Host";

const ForgetPwd = ({closeModal}) => {
  let history = useNavigate();
  const [formData, setFormData] = useState({
    mobile: "",
    photo: null,
  });

  const [newFPassword, setNewFPassword] = useState({
    password: "",
  });

  const [message, setMessage] =useState(false)

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setNewFPassword({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
    setNewFPassword({ ...formData, photo: e.target.files[0] });
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [retake, setRetake] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        alert("Unable to access camera.");
      });
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get Base64 image data
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    setRetake(true);

    // Convert Base64 to File
    const base64ToFile = (base64Data, fileName) => {
      const arr = base64Data.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], fileName, { type: mime });
    };

    const imageFile = base64ToFile(imageData, "captured-image.png");

    // Stop the camera
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    setIsCameraOpen(false);
    setFormData({ ...formData, live_image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${Host}/api/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: formData.mobile,
        // password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.token) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.token);
      // props.showAlert("Logedin successfully", "success")
      console.log("otp sent successful");
      // history("/");
      setMessage(true)
      alert("OTP SENT");
    } else {
      console.log("error");
      setMessage(true);
      alert("OTP SENT");
      // props.showAlert("Invalid Details", "danger")
    }
  };

  //   OTP process
  const defaultOtp = "77777";
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);
  const [newPassword] = useState("");
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
      closeModal(false)
    }
  };

  return (
    <div className="flex justify-center items-center ">
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
                  name="country"
                  value={formData.country || "+91"}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
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
                placeholder="Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Upload Photo */}
          <div className="mb-6 text-center">
            <label htmlFor="photo" className="inline-block cursor-pointer" onClick={handleOpenCamera}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                <FontAwesomeIcon icon={faCamera} className="h-8 w-8" />
              </div>
            </label>
            <p className="mt-2">Upload Live Photo</p>
            {/* <input
              type="file"
              id="photo"
              accept="image/*"
              capture="environment" // Use 'user' for the front camera
              onChange={handleFileUpload}
              className="hidden"
              /> */}
              {retake && <p>retake</p>}
          </div>
            {isCameraOpen && (
              <div className="mb-4">
                <video
                  ref={videoRef}
                  className="w-full h-64 bg-black rounded-md"
                />
                <canvas ref={canvasRef} className="hidden" />
                <button
                  onClick={handleCapture}
                  className="w-full bg-green-700 text-white py-2 mt-2 rounded-md hover:bg-green-800"
                >
                  Capture Photo
                </button>
              </div>
            )}
            {capturedImage && (
              <div className="mb-4">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-64 rounded-md object-cover"
                />
              </div>
            )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800"
          >
            Send OTP
          </button>
        </form>
        {message && (
          <p>OTP Sent Successfully</p>
        )}
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
