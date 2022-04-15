import React from "react";
import AccomodationCard from "../accomodationCard";
import Grid from "@material-ui/core/Grid";
import {useQuery} from "react-query";
import {deleteAccomodation} from '../../api/api.js'

const AccomodationList = ( { accomodations, action }) => {
  
  let accomodationCards = accomodations?.map((acc) => (
    // <Grid 
    // key={acc._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <AccomodationCard key={acc._id} accomodation={acc} action={action} />
    // </Grid>
  ));
  return accomodations ? accomodationCards : null};

export default AccomodationList;