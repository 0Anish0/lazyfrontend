import AdminContext from "./AdminContext";
import Host from "../Host/Host";
import { useState } from "react";

const AdminState = (props) => {
    const adminData = []

    const [notes, setNotes] = useState(adminData)

    // Get all Note
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

    return (
        <AdminContext.Provider value={{ notes, getAllUsers }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState;
