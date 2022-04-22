import React from "react";
import { Paper } from "@mui/material";
import FriendCard from "../friendCard";

const FriendList = ( { students, action, type, searchInput }) => {


  const filteredSearch = students?.filter((el) => {
    if(searchInput === ''){
      return el;
    }
    else{
      return el.fname.toLowerCase().includes(searchInput)
    }
  })

  console.log(filteredSearch)
  
  let studentCards = filteredSearch?.map((student) => (
    // <Grid 
    // key={acc._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <FriendCard key={student._id} type={type} student={student} action={action} />
    // </Grid>
  ));
  return filteredSearch?.length > 0 ? studentCards : 
  <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent:"center", color:"white", height:"60vh"}}><div><h3>Oops.. Nothing to see here yet</h3></div></div>}
  ;

export default FriendList;