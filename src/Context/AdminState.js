import AdminContext from "./AdminContext";
import Host from "../Host/Host";
import { useState } from "react";

const AdminState = (props) => {
    const adminData = []

    const [notes, setNotes] = useState(adminData)

    // Get all User
    const getAllUsers = async () => {
        // API Call
        const response = await fetch(`${Host}/api/admin/list-users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // Delete user
    const deleteUser = async (id) => {
        // API Call
        const response = await fetch(`${Host}/api/admin/user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)

        console.log("deleting note with id" + id)
        const newNotes = notes.filter((note) => { return note.user_id !== id })
        setNotes(newNotes)
    }

    // Get User by Id
    const getUserById = async (user_id) => {
        // API Call
        try {
            const response = await fetch(`${Host}/api/admin/user/${user_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json()
            setNotes([json])
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <AdminContext.Provider value={{ notes, getAllUsers, getUserById, deleteUser }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState;