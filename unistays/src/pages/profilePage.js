import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate()

const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
}
    return (
        <>
        <h1>Welcome</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default ProfilePage;