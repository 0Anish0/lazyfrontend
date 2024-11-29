import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import AdminContext from '../../Context/AdminContext';

const UserTable = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const context = useContext(AdminContext);
    const { notes, getAllUsers ,deleteUser } = context;
    console.log(notes, "notes")

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllUsers()
            setLoading(false)
        }
        else {
            setLoading(true)
            setError(true)
            // history("/log-in")
        }
        // eslint-disable-next-line
    }, []);


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
                    {notes.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">
                                <input type="checkbox" />
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
                            <td className="border px-4 py-2">{user.country}</td>
                            <td className="border px-4 py-2">{user.country}</td>
                            <td className="border px-4 py-2">{user.country}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-yellow-500 text-white rounded px-2 hover:bg-yellow-600">
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white rounded px-2 hover:bg-red-600 ml-2" onClick={() => deleteUser(user.user_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
                <button className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400">
                    Previous
                </button>
                <span className="font-medium">1</span>
                <button className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400">
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;