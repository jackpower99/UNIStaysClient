import React, { useEffect, useState } from 'react'
import SideBarMenu from '../sideBarMenu'
import DisplayDetails from "../displayDetails";
import { useQuery } from 'react-query';
import { getLandlordDetails } from '../../api/api';
import { Container, makeStyles, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import PostVacancy from '../postVacancy';
import { getLandlordProperties } from '../../api/api';
import DisplayProperties from '../displayProperties';
import {deleteAccomodation} from '../../api/api.js'

export default function LandlordPageTemplate() {

 const [emailLS, setEmail ] = useState(JSON.parse(localStorage.getItem("userEmail")))
 const [role, setRole ] = useState(JSON.parse(localStorage.getItem("userRole")))

 const [ landlord, setLandlord ] = useState({});
 const [ menuItem, setMenuItem ] = useState("My Details");

 const [ landlordsProperties, setLandlordProperties ] = useState([]);

 const [landlordId, setLandlordId] = useState("");

 const [accomodationDeleted, setAccomodationDeleted] = React.useState({});
 const [runQueryFlag, setRunQueryFlag] = React.useState(false);

 const [menuChangeRnQueryFlag, setMenuChangeRunQueryFlag] = React.useState(false);

 const landlordRestructured = (existingLandlord) => {
  setLandlord((({ email, fname, lname, address, date_of_birth, phone_number, documents, properties}) => 
 ({ email, fname, lname, address, date_of_birth, phone_number, documents, properties}))(existingLandlord));
 }

 const handleMenuItemSelected = (selected) => { 
   if(landlordId) setMenuChangeRunQueryFlag(true);
  setMenuItem(selected);
 }

 useQuery(
  ["getLandlordDetails", { email: emailLS }],
  getLandlordDetails,{
  onSuccess: (data)=>{
    landlordRestructured(data.existingLandlord)
    setLandlordId(data.existingLandlord._id)
    localStorage.setItem("landlordId", data.existingLandlord._id)
  },
  onError: (err) =>{
      console.log(err);
  },
  cacheTime: 500,
  }
);

console.log(landlordId)

useQuery(
  ["getLandlordProperties", { id: landlordId }],
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
["delete accomodation", {id: accomodationDeleted._id}],
deleteAccomodation,{
onSuccess: (data)=>{
    setLandlordProperties(data.accomodations)
    setRunQueryFlag(false)
},
onError: (err) =>{
  console.log(err);
  setRunQueryFlag(false)
},
  enabled: runQueryFlag === true,
}
);


  return (
      <>
      <Grid container>
        <Grid item xs ={3}>
      <SideBarMenu menuItemSelected={handleMenuItemSelected} menuItems={['My Properties', 'Advertise', 'Social']}/>
      </Grid>
      <Grid item xs ={9} sx={{ display: "flex", justifyContent: "center" }}>

      {menuItem === "Social" && 
         <DisplayDetails role={ role } user={ landlord } />
      }
      {menuItem === "Advertise" &&
        <PostVacancy />
      }
         {menuItem === "My Properties" &&
           <DisplayProperties accomodations={landlordsProperties} action={action} />
         }
         </Grid>
         
         </Grid>
    </>
  )
}
