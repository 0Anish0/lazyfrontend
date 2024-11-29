import React, {useEffect } from "react";

import { useNavigate } from "react-router-dom";
// import AdminContext from "../../Context/AdminContext";

const Home = () => {
    // const context = useContext(AdminContext);
    // const { notes, getAllUsers } = context;

    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            // getAllUsers();
        } else {
            history("/log-in");
        }
        // eslint-disable-next-line
    }, []);



    return (
        <div className="flex justify-center items-center bg-gray-100 w-full md:w-[100%]">
            <div className="flex justify-center items-center bg-white shadow rounded-2xl w-3/2 md:w-70%]">
                <video controls className="h-full w-full rounded-2xl">
                    <source
                        src="https://res.cloudinary.com/dfv1qnzoz/video/upload/v1719039250/gh211amrhepwgubdirem.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default Home;