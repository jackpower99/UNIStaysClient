import React from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@material-ui/core';
import {useQuery} from "react-query";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import ProcessPaymentStripe from '../processPaymentStripe';
import ToggleDays from '../toggleDays';
import moment from 'moment'

import { Box, TextField, Typography, Paper, Button } from '@mui/material';

import { bookAccomodation } from '../../api/api';

export default function ReservationCard(props) {

    const { postingType, price, startDate, endDate, landlordID, accomodationID, alreadyBookedDates, disabled } = props;

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

var dateOffset = (24*60*60*1000); 
var startDateMinus1Day = new Date(startDate);
startDateMinus1Day.setTime(startDateMinus1Day.getTime() - dateOffset);

var endDateMinus1Day= new Date(endDate);
endDateMinus1Day.setTime(endDateMinus1Day.getTime() - dateOffset);

console.log(moment(startDate).zone('+01:00'))

const navigate = useNavigate();


    const [date, setNewDate] = React.useState([startDateMinus1Day, endDateMinus1Day])
    const [UNIFlexDays, setUNIFlexDays] = React.useState([])
    const [UNIFlexDates, setUNIFlexDates] = React.useState([])
    const[paymentPrice, setPaymentPrice] = React.useState(0)
    const[paymentNights, setPaymentNights] = React.useState(0)

    const [UNIBNBDates, setUNIBNBDates] = React.useState([])

    var alreadyBookedDatesParsed = []
    alreadyBookedDates.forEach(i =>{
      alreadyBookedDatesParsed = [...alreadyBookedDatesParsed, new Date(i)]
    })

    const [submitFlag, setSubmitFlag] = React.useState(false)

    const [UNIFlexConflictDates, setUNIFlexConflictDates] = React.useState([])

    const [open, setOpen] = React.useState(false);

    const [processPaymentFlag, setProcessPaymentFlag] = React.useState(false);

    const [token, setToken ] = React.useState(localStorage.getItem("token"))

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const studentID = localStorage.getItem("studentId");

    console.log(studentID)

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            gap: 10,
            height: "50vh",
            borderRadius: 20, 
            borderColor: "#FE7E6D",
            padding: 50,

          '& .MuiButton-root':{
            backgroundColor: "#FE7E6D",
            width: "6vw",
            color: "white",
            marginTop: "2vh",
            '&:hover': {
                backgroundColor: "#FE7E6D",
                color: "white",
            }

          }
        }

      }));

const classes = useStyles();

const processPayment = () => {
    setPaymentNights( postingType === "UNIBNB" ? getUNIBNBNumberOfDays(date[0], date[1]) :  postingType === "UNIFlex" ? getUNIFlexNumberOfDays(date[0], date[1],UNIFlexDays) : "WS")
    setPaymentPrice( postingType === "WS" ? (getMonthDifference(date[0],date[1]) * price).toFixed(2) : postingType === "UNIBNB" ? (getUNIBNBNumberOfDays(date[0], date[1]) * price/30).toFixed(2) : (getUNIFlexNumberOfDays(date[0],date[1], UNIFlexDays) * price/30).toFixed(2))

    setProcessPaymentFlag(true)
  }

useQuery(
    ["bookAccomodation", { 
      _id: accomodationID,  
      landlordId: landlordID,
      studentId: studentID,
      agreementType: postingType,
      startDate: moment(date[0]).zone('+01:00'),
      endDate: moment(date[1]).zone('+01:00'),
      flexiDays: UNIFlexDays,
      bookedDates: postingType === "UNIFlex" ? UNIFlexDates : UNIBNBDates,
      postingType: postingType,
      token: token
    } ],
    bookAccomodation,{
    onSuccess: (data)=>{
        if(data.code === 201){  
          console.log(data)
          setProcessPaymentFlag(false)
          setSubmitFlag(false)
          navigate(0)
        }
    console.log(data)
    },
    onError: (err) =>{
        setSubmitFlag(false)
      console.log(err);
    },
      enabled: submitFlag === true,
      cacheTime: 0
    }
  );

function getMonthDifference(startDate, endDate) {
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  }

const getUNIFlexNumberOfDays = (start, end, days) => {

    var totalTemporary = 0;

    for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if(days.includes(d.getDay())){
            totalTemporary += 1;
        }
     }
     return totalTemporary;
}

const getUNIBNBNumberOfDays = (start, end) => {

  var totalTemporary = 0;

  for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if(alreadyBookedDatesParsed.find(o => o.getTime() === d.getTime()) === undefined){
          totalTemporary += 1;
      }
   }
   return totalTemporary;
}

const UNIFlexReservationHandler = () =>{
    const start = date[0];
    const end = date[1];

    var UNIFlexDatesTemp = []

    var tempDatesArrayConflicts =[]

    for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if(UNIFlexDays.includes(d.getDay())){
          UNIFlexDatesTemp = [...UNIFlexDatesTemp, moment(d, "MM-DD-YYYY").zone('+01:00')]
        }
     }

     UNIFlexDatesTemp.forEach(d=>{
       if(alreadyBookedDatesParsed.find(o=> o.getTime() === d.valueOf()) !== undefined){
         tempDatesArrayConflicts = [...tempDatesArrayConflicts,  moment(d, "MM-DD-YYYY").zone('+01:00') ]    
        }
     })

     if(tempDatesArrayConflicts.length === 0){
        setUNIFlexDates(UNIFlexDatesTemp)
        processPayment()
        //setSubmitFlag(true)
     }
     else if(tempDatesArrayConflicts.length > 0){
       setUNIFlexDates(UNIFlexDatesTemp)
       console.log(tempDatesArrayConflicts)
       setUNIFlexConflictDates(tempDatesArrayConflicts)
       setOpen(true)
     }
} 

const UNIBNBReservationHandler = () =>{
  const start = date[0];
  const end = date[1];

  var tempDatesArray = []
  for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    console.log(d)
    if(alreadyBookedDatesParsed.find(o => o.getTime() === d.getTime()) === undefined){
    tempDatesArray = [...tempDatesArray, new Date(d)]
  }
}
   setUNIBNBDates(tempDatesArray);
   processPayment()
} 

const handleReservationMade = (e) => {
    e.preventDefault();
    if(postingType === "UNIFlex") UNIFlexReservationHandler();
    if(postingType === "UNIBNB") UNIBNBReservationHandler();
}

const cb = (result)=> {
  setSubmitFlag(result)
}

const cancelUNIFlex = (e) => {
    e.preventDefault();
    setOpen(false)
}

const disableBookedDates = (d) => {
 if(alreadyBookedDatesParsed.find(o => o.getTime() === d.getTime()) !== undefined){
    return true;
 }
}

const continueUNIFlexWithoutConflicts = (e) => {


  console.log(UNIFlexDates)
  console.log(UNIFlexConflictDates)

    e.preventDefault();
    var temp = [];
    for (var i = 0; i < UNIFlexDates.length; i++){
      if(UNIFlexConflictDates.find(o => o.valueOf() === UNIFlexDates[i].valueOf()) === undefined){
        temp = [...temp, new Date( UNIFlexDates[i])]
      }
      }
    setUNIFlexDates(temp);
    processPayment()
    setOpen(false)
    }

const daysSelectedCallback = (days) => {
    setUNIFlexDays(days)
}
   
const handleClose = () => {
    setOpen(false);
  };

  const handlePPClose = () => {
    setProcessPaymentFlag(false);
  };

  return (
      <>
      <Paper variant='outlined' sx={{borderRadius: '20px', border: "8px solid #FE7E6D"}} className={classes.root}>
    <Typography sx={{marginTop: "5vh", marginBottom: "5vh"}} variant="h4" component="h4">
      Total: €{postingType === "WS" ? (getMonthDifference(date[0],date[1]) * price).toFixed(2) : postingType === "UNIBNB" ? (getUNIBNBNumberOfDays(date[0], date[1]) * price/30).toFixed(2) : (getUNIFlexNumberOfDays(date[0],date[1], UNIFlexDays) * price/30).toFixed(2)}
      </Typography>
    <LocalizationProvider dateAdapter={DateAdapter}>
    {/* <Stack spacing={3}> */}
        {isMobile && 
        
        
      <MobileDateRangePicker 
        startText="Start"
        value={date}
        minDate={date[0]}
        maxDate={date[1]}
        disabled={disabled || postingType === "WS"}
        onChange={(newValue) => {
          setNewDate(new Date(newValue));
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps}  />
          </React.Fragment>
        )}
      />
        }
         {!isMobile &&
      <DesktopDateRangePicker
        startText="Start"
        value={date}
        minDate={startDateMinus1Day}
        maxDate={endDateMinus1Day}
        shouldDisableDate={ postingType === "UNIBNB" || postingType === "UNIFlex" ? disableBookedDates: null}
        disabled={disabled || postingType === "WS"}
        onChange={(newValue) => {
          setNewDate(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps}   sx={{width:"7vw"}}/>
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps}   sx={{width:"7vw"}}/>
          </React.Fragment>
        )}
      />
         }
    {/* </Stack> */}
  </LocalizationProvider>

{ postingType === "UNIBNB" &&
  <Typography sx={{marginTop: "2vh", marginBottom: "2vh"}} variant="h6" component="h6">
      UNIBNB Nights: {getUNIBNBNumberOfDays(date[0], date[1])}
      </Typography>
}


{ postingType === "UNIFlex" &&
  <Typography sx={{marginTop: "2vh", marginBottom: "2vh"}} variant="h6" component="h6">
      UNIFlex Total Nights: {getUNIFlexNumberOfDays(date[0],date[1], UNIFlexDays)}
      </Typography>
}

{
    postingType === "UNIFlex" &&
    <ToggleDays daysSelectedCallback={daysSelectedCallback} />
}

  <Button 
  onClick={handleReservationMade} 
  disabled={disabled}
  type="submit"
  variant="contained" >
      Reserve
        </Button>
  </Paper>
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"UH OH! Some of these dates have been booked already. Would you like to contunue without these dates?"}</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} id="alert-dialog-slide-description">

      {UNIFlexConflictDates.map((d, index) =>(
<div style={{color: "black"}} key={index}>{JSON.stringify(new Date(d.valueOf()) + dateOffset ).substring(1,11)}</div>
      ))}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={cancelUNIFlex}>Cancel</Button>
      <Button onClick={continueUNIFlexWithoutConflicts}>Confirm</Button>
    </DialogActions>
  </Dialog>

  <Dialog
   open={processPaymentFlag}
   TransitionComponent={Transition}
   keepMounted
   onClose={handlePPClose}
   aria-describedby="alert-dialog-slide-description"
  >
    <DialogContent>
    <ProcessPaymentStripe cb={cb} price={paymentPrice} nights={paymentNights}  /> 
    </DialogContent>
  </Dialog>

</>
  )
}