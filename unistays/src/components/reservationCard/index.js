import React from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import {useQuery} from "react-query";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

import ToggleDays from '../toggleDays';

import { Container, FormControl, Box, TextField, IconButton, Typography, Paper, Button } from '@mui/material';

import { bookAccomodation } from '../../api/api';
import { set } from 'date-fns';

export default function ReservationCard(props) {

    const { postingType, price, startDate, endDate, landlordID, accomodationID, alreadyBookedDates } = props;

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

var dateOffset = (24*60*60*1000); 
var startDateMinus1Day = new Date(startDate);
startDateMinus1Day.setTime(startDateMinus1Day.getTime() - dateOffset);

var endDateMinus1Day= new Date(endDate);
endDateMinus1Day.setTime(endDateMinus1Day.getTime() - dateOffset);

const navigate = useNavigate();


    const [date, setNewDate] = React.useState([startDateMinus1Day, endDateMinus1Day])
    const [UNIFlexDays, setUNIFlexDays] = React.useState([])
    const [UNIFlexDates, setUNIFlexDates] = React.useState([])

    const [UNIBNBDates, setUNIBNBDates] = React.useState([])
    const [UNIBNBDaysCount, setUNIBNBDaysCount] = React.useState(getDayDifference(date[0], date[1]))

    var temp = []
    alreadyBookedDates.forEach(i =>{
      temp = [...temp, new Date(i)]
    })
    const [alreadyBookedDatesParsed, setAlreadyBookedDatesParsed] = React.useState(temp)

    const [submitFlag, setSubmitFlag] = React.useState(false)

    const [UNIFlexConflictDates, setUNIFlexConflictDates] = React.useState([])

    const [open, setOpen] = React.useState(false);

    const[paymentSuccess, setPaymentSuccess] = React.useState(false)

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const studentID = JSON.parse(localStorage.getItem("user"))._id;

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

console.log(paymentSuccess)

const processPayment = () => {
  navigate('/payment-page', { state:{ 
    nights: postingType === "UNIBNB" ? getUNIBNBNumberOfDays(date[0], date[1]) :  postingType === "UNIFlex" ? getUNIFlexNumberOfDays(date[0], date[1],UNIFlexDays) : "WS",
    price: postingType === "WS" ? (getMonthDifference(date[0],date[1]) * price).toFixed(2) : postingType === "UNIBNB" ? (getUNIBNBNumberOfDays(date[0], date[1]) * price/30).toFixed(2) : (getUNIFlexNumberOfDays(date[0],date[1], UNIFlexDays) * price/30).toFixed(2)
 
}
  })
}

React.useEffect(() => {
  function checkPaymentReceived() {
    const item = localStorage.getItem('paymentReceived')

    console.log(item)

    if (item === true) {
      setSubmitFlag(item)
    }
  }

  window.addEventListener('storage', checkPaymentReceived)

  return () => {
    window.removeEventListener('storage', checkPaymentReceived)
  }
}, [])


useQuery(
    ["bookAccomodation", { 
      _id: accomodationID,  
      landlordId: landlordID,
      studentId: studentID,
      agreementType: postingType,
      startDate: date[0],
      endDate: date[1],
      flexiDays: UNIFlexDays,
      bookedDates: postingType === "UNIFlex" ? UNIFlexDates : UNIBNBDates,
      postingType: postingType,
    }],
    bookAccomodation,{
    onSuccess: (data)=>{
        console.log(data)
      if(data.success === false){
          if(data.dates){
            var temp = []
              data.dates.forEach(date=>{
                temp = [...temp, new Date(date)]
              })
              setUNIFlexConflictDates(temp)
              setOpen(true);
              setSubmitFlag(false)

      }
    }
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

function getDayDifference(startDate, endDate) {

var Difference_In_Time = endDate.getTime() - startDate.getTime()  
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
console.log(Difference_In_Days)
return Difference_In_Days;

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

    var tempDatesArray = []

    for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if(UNIFlexDays.includes(d.getDay())){
            tempDatesArray = [...tempDatesArray, new Date(d)]
        }
     }
     setUNIFlexDates(tempDatesArray);
     processPayment()
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
    e.preventDefault();

    var temp = [];

    for (var i = 0; i < UNIFlexDates.length; i++){
       const match = UNIFlexConflictDates.find(d => d.getTime() === UNIFlexDates[i].getTime());
       if(match === undefined){
        temp = [...temp, UNIFlexDates[i]]
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
        disabled={postingType === "WS"}
        onChange={(newValue) => {
          setNewDate(new Date(newValue));
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps}   sx={{width:"7vw"}} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps}   sx={{width:"7vw"}} />
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
        shouldDisableDate={ postingType === "UNIBNB" ? disableBookedDates: null}
        disabled={postingType === "WS"}
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
<div style={{color: "black"}} key={index}>{JSON.stringify(new Date(d.setTime(d.getTime() + dateOffset))).substring(1,11)}</div>
      ))}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={cancelUNIFlex}>Cancel</Button>
      <Button onClick={continueUNIFlexWithoutConflicts}>Confirm</Button>
    </DialogActions>
  </Dialog>
</>
  )
}