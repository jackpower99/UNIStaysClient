import React from "react";
import UserRoleCard from "../components/userRoleCard";

const UserRolePage = () => {
    return(
        <div>
    <UserRoleCard role={"Student"}></UserRoleCard>
    <UserRoleCard role={"Landlord"}></UserRoleCard>
    </div>
    )
}
export default UserRolePage;