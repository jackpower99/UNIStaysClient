import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getLandlordDetails } from '../../api/api';


export default function DisplayDetails( { role, user } ) {

console.log(user);

const keys = Object.keys(user);
const values = Object.values(user);

  return (
      keys.map((key, index) =>(
<div key={index} style={{marginLeft: "10vw"}}>{(key +  values[index])}</div>
      ))
  )
}
