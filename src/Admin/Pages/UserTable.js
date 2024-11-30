import React, { useState, useEffect, useContext } from "react";
import Header from "../Components/Header";
import AdminContext from "../../Context/AdminContext";
import Host from "../../Host/Host";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const context = useContext(AdminContext);
  const { notes, getAllUsers, deleteUser } = context;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    mobile: "",
    country: "",
  });

  const users = notes.filter((user) => user.role === "user");
  const navigate = useNavigate();

  const handleUserClick = (user_id) => {
    navigate(`/admin/user-list/${user_id}`);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllUsers();
      setLoading(false);
    } else {
      setLoading(true);
      setError(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleEditClick = (user) => {
    setEditUser(user); // Set the user to edit
    setFormData({
      mobile: user.mobile,
      country: user.country,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${Host}/api/admin/user/${editUser.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("User updated successfully!");
        getAllUsers(); // Refresh user list
        setEditUser(null); // Close modal
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Server error occurred while updating user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

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
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">
              <input type="checkbox" />
            </th>
            <th className="border px-4 py-2">Profile</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">Ads</th>
            <th className="border px-4 py-2">Active Ads</th>
            <th className="border px-4 py-2">In-Active Ads</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="border px-4 py-2">
                <img
                  src={user.live_image}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{user.user_id}</td>
              <td className="border px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="border px-4 py-2">{`${user.first_name} ${user.last_name}`}</td>
              <td className="border px-4 py-2">{user.mobile}</td>
              <td className="border px-4 py-2">{user.country}</td>
              <td className="border px-4 py-2">{"-"}</td>
              <td className="border px-4 py-2">{"-"}</td>
              <td className="border px-4 py-2">{"-"}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white rounded px-2 hover:bg-yellow-600"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white rounded px-2 hover:bg-red-600 ml-2"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this user?"
                      )
                    ) {
                      deleteUser(user.user_id);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white rounded px-2 hover:bg-red-600 ml-2"
                  onClick={() => handleUserClick(user.user_id)}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Edit User</h2>
            <div className="mb-2">
              <label className="block mb-1">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mr-2"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
