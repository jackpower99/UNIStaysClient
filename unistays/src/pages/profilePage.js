import React from "react";
import { useNavigate } from "react-router-dom";
import LandlordPageTemplate from '../components/landlordPageTemplate';

const ProfilePage = () => {

    const navigate = useNavigate()
    const { role }  = JSON.parse(localStorage.getItem("user"));

// const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login")
// }
    return (

        <>
        {/* { role === "Landlord" && */}
       <LandlordPageTemplate />
        {/* // } */}
 
        </>
    )
}

export default ProfilePage;