import React from "react";
import { useNavigate } from "react-router-dom";
import LandlordPageTemplate from '../components/landlordPageTemplate';

const ProfilePage = () => {

    const navigate = useNavigate()
    const role   = localStorage.getItem("userRole")

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