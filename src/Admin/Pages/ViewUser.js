import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../Context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";

const ViewUser = () => {
  const context = useContext(AdminContext);
  const { notes, getUserById } = context;
  const { pathName } = useParams();
  let history = useNavigate();

  const user = Array.isArray(notes)
    ? notes.find((user) => user.user_id === pathName)
    : null;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserById(pathName);
    } else {
      history("/admin");
    }
    // eslint-disable-next-line
  }, []);

  if (!notes || !Array.isArray(notes)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <Header />
      <div className="mt-24 mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="border mr-2 border-gray-300 rounded-3xl p-2 flex-grow"
        />
        <button className="bg-blue-900 text-white rounded-md px-4 hover:bg-blue-800 text-2xl">
          Search
        </button>
      </div>
      <div className="flex flex-col items-center justify-center  bg-gray-100 p-6">
        <div
          key={user?._id}
          className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg text-center"
        >
          <div className="mb-6">
            <img
              src={user?.live_image}
              alt="Profile"
              className="rounded-full w-40 h-40 mx-auto object-cover"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.first_name}
          </h1>
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.last_name}
          </h1>
          <div className="mt-6 text-left space-y-4">
            <p className="text-gray-700">
              <span className="font-medium">Country:</span> {user?.country}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> {user?.mobile}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">City:</span> {user?.city}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Gender:</span> {user?.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
