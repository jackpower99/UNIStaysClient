import React, { useState } from 'react'
import SideBarMenu from '../sideBarMenu'
import DisplayDetails from "../displayDetails";
import { useQuery } from 'react-query';
import { getLandlordDetails } from '../../api/api';
import { Grid } from '@material-ui/core';
import PostVacancy from '../postVacancy';
import { getLandlordProperties } from '../../api/api';
import DisplayProperties from '../displayProperties';
import {deleteAccomodation, getStudentDetails, getStudentBookings} from '../../api/api.js'
import { useNavigate } from 'react-router-dom';

export default function LandlordPageTemplate() {

  const navigate = useNavigate()

 const [emailLS, setEmail ] = useState(JSON.parse(localStorage.getItem("userEmail")))
 const [role, setRole ] = useState(JSON.parse(localStorage.getItem("userRole")))

 const [token, setToken ] = useState(localStorage.getItem("token"))

 const [ landlord, setLandlord ] = useState({});
 const [ menuItem, setMenuItem ] = useState("Social");

 const [ landlordsProperties, setLandlordProperties ] = useState([]);

 const [landlordId, setLandlordId] = useState("");

 const [accomodationDeleted, setAccomodationDeleted] = React.useState({});
 const [runQueryFlag, setRunQueryFlag] = React.useState(false);

 const [studentId, setStudentId] = useState("");

 const [student, setStudent] = useState({})

 const [menuChangeRnQueryFlag, setMenuChangeRunQueryFlag] = React.useState(false);

 const [ studentBookings, setStudentBookings ] = useState([]);

 const landlordRestructured = (existingLandlord) => {
   if(role === "Landlord"){
  setLandlord((({ email, fname, lname, address, date_of_birth, phone_number, documents, properties, profile_picture}) => 
 ({ email, fname, lname, address, date_of_birth, phone_number, documents, properties, profile_picture}))(existingLandlord));
 }
}

 const handleMenuItemSelected = (selected) => { 
   if(landlordId) setMenuChangeRunQueryFlag(true);
  setMenuItem(selected);
 }

 console.log(localStorage.getItem("token"))

console.log(role)

 useQuery(
  ["getLandlordDetails", { email: emailLS, token: token }],
  getLandlordDetails,{
  onSuccess: (data)=>{
    landlordRestructured(data?.existingLandlord)
    setLandlordId(data?.existingLandlord?._id)
    localStorage.setItem("landlordId", data?.existingLandlord?._id)
  },
  onError: (err) =>{
      console.log(err);
  },
  refetchOnMount: "always",
  //enabled: role === "Landlord"
  }
);

useQuery(
  ["getStudentDetails", { email: emailLS, token: token }],
  getStudentDetails,{
  onSuccess: (data)=>{
    setStudentId(data?.existingStudent?._id)
    setStudent(data?.existingStudent)
    localStorage.setItem("studentId", data?.existingStudent?._id)
  },
  onError: (err) =>{
      console.log(err);
  },
  refetchOnMount: "always",

  }
);

console.log(emailLS)


useQuery(
  ["getLandlordProperties", { id: landlordId, token: token }],
  getLandlordProperties,{
  onSuccess: (data)=>{
  setLandlordProperties(data)
  },
  onError: (err) =>{
      console.log(err);
  },
  enabled: landlordId !== "" || menuChangeRnQueryFlag === true,
  cacheTime: 0,
  }
);

const action = (actionToDo, acc) => {
 console.log(2)
 if(actionToDo === "Delete"){
   setAccomodationDeleted(acc)
   setRunQueryFlag(true) 
 }
}

useQuery(
["delete accomodation", {id: accomodationDeleted._id, token: token}],
deleteAccomodation,{
onSuccess: (data)=>{
    setRunQueryFlag(false)
    navigate(0)
},
onError: (err) =>{
  console.log(err);
  setRunQueryFlag(false)
},
  enabled: runQueryFlag === true,
}
);

useQuery(
  ["getStudentBookings", { id: localStorage.getItem("studentId"), token: token }],
  getStudentBookings,{
  onSuccess: (data)=>{
    setStudentBookings(data)
  },
  onError: (err) =>{
      console.log(err);
  },
  refetchOnMount: "always",
  }
);

  return (
      <>
      <Grid container>
        <Grid item xs ={2}>
      <SideBarMenu menuItemSelected={handleMenuItemSelected} menuItems={[{"Landlord":['My Properties', 'Advertise', 'Social']}, {"Student":["My Bookings","Social"] } ] }/>
      </Grid>
    
      <Grid item xs ={10}>
      <div style={{display: "flex", flexDirection:"row", justifyContent: "flex-start", alignItems:"center", flexWrap:"nowrap" }}>

      {menuItem === "Social" && 
         <DisplayDetails role={role} user={ role ==="Landlord" ? landlord : student } />
      }
      {menuItem === "Advertise" &&
        <PostVacancy />
      }
         {(menuItem === "My Properties" || menuItem === "My Bookings")  &&
           <DisplayProperties accomodations={ role ==="Landlord" ? landlordsProperties : studentBookings} action={action} />
         }
              </div>
         </Grid>
    
         
         </Grid>
    </>
  )
}
