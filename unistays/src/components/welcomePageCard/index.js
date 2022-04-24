import React from 'react'
import logo from "../../resource/images/mainLogo.png";
import { makeStyles } from '@material-ui/core';
import { Paper, Typography } from '@mui/material';

export default function WelcomePageCard() {

    const useStyles = makeStyles(theme => ({
        root: {
            display : "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            padding: theme.spacing(2),
            backgroundColor: "white",
            height: "75vh"
        }
      }));

      const classes = useStyles();
  return (
<>
<Paper elevation={2} className={classes.root}>

    <img src={logo} alt="logo"></img>

    
    <Paper sx={{display : "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            gap: 4,
            width: "40vw"}} 
        elevation={0}>
        <Typography variant="h5" component="p">
            Welcome to UNIStays!  
        </Typography>
        <Typography variant="h5" component="p">
            Our mission at UNIStays  
        </Typography>
    </Paper>



    </Paper>

    </>
  )
}
