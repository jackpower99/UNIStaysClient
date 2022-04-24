import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Typography, Paper } from '@mui/material';
import useResponsiveFontSize from "../useResponsiveFontSize";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";


export default function AgreementCardsDisplay() {

    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const fontSize = useResponsiveFontSize();

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
       mob: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 30,
        position: "relative",
       },
       mobCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'flex-start',
        width: "85vw",
        height: "25vh",
       },
       mobCardContent: {
        padding: 10, 
        fontSize : 22,
        fontFamily: 'Helvetica',
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
           fontSize : fontSize,
           fontFamily: 'Helvetica',
       }
   }));

  const classes = useStyles();

  return (

    <div className={isMobile ? classes.mob : classes.root}>

        <Paper elevation={23} className={isMobile? classes.mobCard : classes.card} sx={{ border: '6px solid #FE7E6D', borderRadius: "30px"}}>
            <Typography className={isMobile ? classes.mobCardContent : classes.cardContent} variant='h4' component='h4'>
                UNIFlex
            </Typography>
            <Typography className={isMobile ? classes.mobCardContent : classes.cardContent}>
                Pay only for the nights you need! So your timetable only requres you to be campus for 3 days a week but you pay the monthly rate.. That doesn't seem fair. UNIStays offers landlords the chance to offer their properties using UNIFlex. UNIFlexible properties allow students to only pay for the weeknights they need.
            </Typography>


        </Paper>
        <Paper elevation={23} className={isMobile? classes.mobCard : classes.card} sx={{ border: '6px solid #76dbf5', borderRadius: "30px"}}>
        <Typography className={isMobile ? classes.mobCardContent : classes.cardContent} variant='h4' component='h4'>
                UNIBNB
            </Typography>
            <Typography className={isMobile ? classes.mobCardContent : classes.cardContent}>
                So your planning a visit to a friend in another college, but you need somewhere to stay that's not their leather couch. UNIStays gives landlords the chance to post their paccomodations as UNIBNB available. This gives students the opportunity to book accomodation for short stays.
            </Typography>

        </Paper>
        <Paper elevation={23} className={isMobile? classes.mobCard : classes.card} sx={{ border: '6px solid #4bbf75',borderRadius: "30px"}}>
        <Typography className={isMobile ? classes.mobCardContent : classes.cardContent} variant='h4' component='h4'>
                Whole Semester
            </Typography>
            <Typography className={isMobile ? classes.mobCardContent : classes.cardContent}>
                Something your used to. Book or let accomodation for the whole semester. Of course we can't forget the traditional method. So if your timetables packed from Monday to Friday or you just can't wait to get away from your parents. A whole semester property is for you.
            </Typography>

        </Paper>

    </div>
    
  )
}
