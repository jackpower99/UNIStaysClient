import React, { useEffect, useState } from 'react'
import SideBarMenu from '../sideBarMenu'
import DisplayDetails from "../displayDetails";
import { useQuery } from 'react-query';
import { getLandlordDetails } from '../../api/api';
import { Container, makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import PostVacancy from '../postVacancy';

export default function LandlordPageTemplate() {

 const [emailLS, setEmail ] = useState(JSON.parse(localStorage.getItem("user")).email);
 const [role, setRole ] = useState(JSON.parse(localStorage.getItem("user")).role);

 const [ landlord, setLandlord ] = useState({});
 const [ menuItem, setMenuItem ] = useState("My Details");

 const landlordRestructured = (existingLandlord) => {
  setLandlord((({ email, fname, lname, address, date_of_birth, phone_number, documents, properties}) => 
 ({ email, fname, lname, address, date_of_birth, phone_number, documents, properties}))(existingLandlord));
 }

 const handleMenuItemSelected = (selected) => { 
  setMenuItem(selected);
 }

 useQuery(
  ["getLandlordDetails", { email: emailLS }],
  getLandlordDetails,{
  onSuccess: (data)=>{
    landlordRestructured(data.existingLandlord)
  },
  onError: (err) =>{
      console.log(err);
  },
  cacheTime: 500,
  }
);
  return (
      <>
      <Box>
      <SideBarMenu menuItemSelected={handleMenuItemSelected} menuItems={['My Properties', 'Advertise', 'My Details']}/>
      {menuItem === "My Details" && 
      <Box>
         <DisplayDetails role={ role } user={ landlord } />
      </Box>
      }
      {menuItem === "Advertise" &&
      <Box>
        <PostVacancy />
      </Box>
      }
      </Box>
    </>
  )
}
