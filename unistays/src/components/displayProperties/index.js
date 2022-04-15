import React from 'react'
import { Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import AccomodationList from '../accomodationList';

export default function DisplayProperties(props) {
    const { accomodations, action } = props;



  return (
    <>
    { accomodations.length > 0 &&
      <div style={{display: "flex", flexDirection:"row", alignItems: "center", flexWrap: "wrap", gap: 10, marginTop: "2vh"}}>
    <AccomodationList accomodations={accomodations} action={action}></AccomodationList>
    </div>
    }
    { accomodations.length === 0 && 
    <div style={{display: "flex", flexDirection:"column", alignItems: "flex-start", flexWrap: "wrap", justifyContent: 'center', marginTop: "10vh"}}>
      <Paper elevation={2} sx={{padding: 5}}>
    <Typography variant="h3">
      Looks like you haven't advertised any properties yet..
    </Typography>
    </Paper>
    </div>
    }
       </>
  )
}
