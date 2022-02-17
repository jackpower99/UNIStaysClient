import React from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const auth = useAuth()
    const navigate = useNavigate()

const handleLogout = () => {
    auth.logout()
    navigate("/login")
}

    return (
        <>
        <h1>Welcome {auth.user.email}</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default ProfilePage;