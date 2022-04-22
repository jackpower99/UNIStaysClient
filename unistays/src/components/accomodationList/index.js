import React from "react";
import AccomodationCard from "../accomodationCard";

const AccomodationList = ( { accomodations, action }) => {
  
  let accomodationCards = accomodations?.map((acc) => (
      <AccomodationCard key={acc._id} accomodation={acc} action={action} />
  ));
  return accomodations ? accomodationCards : null};

export default AccomodationList;