import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Container, Typography, Paper } from '@mui/material';
import useResponsiveFontSize from "../useResponsiveFontSize";


export default function AgreementCardsDisplay() {

    const fontSize = useResponsiveFontSize();

    console.log(fontSize)

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            flexDirection: "row",

            alignItems: "center",
            justifyContent: "space-evenly",
            minWidth: "100vw",
            width: "100vw",
            height: "55vh",
            gap: 100,
            marginLeft: 'calc(-50vw + 50%)',
            position: "relative",
       },
       card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'flex-start',
        width: "25vw",
        height: "25vh",
        fontSize : fontSize,
       },
       cardContent: {
           padding: 10, 
           paddingTop: 15,
           fontSize : fontSize,
           fontFamily: 'Helvetica',
       }
   }));

  const classes = useStyles();

  return (

    <div className={classes.root}>

        <Paper elevation={23} className={classes.card} sx={{ border: '6px solid #FE7E6D', borderRadius: "30px"}}>
            <Typography className={classes.cardContent} variant='h4' component='h4'>
                UNIFlex
            </Typography>
            <Typography className={classes.cardContent} variant='p' component='p'>
                Pay only for the nights you need! So your timetable only requres you to be campus for 3 days a week but you pay the monthly rate.. That doesn't seem fair. UNIStays offers landlords the chance to offer their properties using UNIFlex. UNIFlexible properties allow students to only pay for the weeknights they need.
            </Typography>


        </Paper>
        <Paper elevation={23} className={classes.card} sx={{ border: '6px solid #76dbf5', borderRadius: "30px"}}>
        <Typography className={classes.cardContent} variant='h4' component='h4'>
                UNIBNB
            </Typography>
            <Typography className={classes.cardContent} variant='p' component='p'>
                So your planning a visit to a friend in another college, but you need somewhere to stay that's not their leather couch. UNIStays gives landlords the chance to post their paccomodations as UNIBNB available. This gives students the opportunity to book accomodation for short stays.
            </Typography>

        </Paper>
        <Paper elevation={23} className={classes.card} sx={{ border: '6px solid #4bbf75',borderRadius: "30px"}}>
        <Typography className={classes.cardContent} variant='h4' component='h4'>
                Whole Semester
            </Typography>
            <Typography className={classes.cardContent} variant='p' component='p'>
                Something your used to. Book or let accomodation for the whole semester. Of course we can't forget the traditional method. So if your timetables packed from Monday to Friday or you just can't wait to get away from your parents. A whole semester property is for you.
            </Typography>

        </Paper>

    </div>
    
  )
}
