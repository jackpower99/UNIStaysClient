import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";

import Grid from "@material-ui/core/Grid";

import { Buffer } from 'buffer';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery } from "react-query";
import { postAccomodationReview } from "../../api/api";
import prop from '../../resource/images/prop.jpg'
import { useNavigate } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
  card: { width: "20vw", height: "60vh",  backgroundColor: "#f2c8c2", color:"white"},
  mobCard: { width: "90%", height: "60vh",  backgroundColor: "#f2c8c2", color:"white"},

  media: { height: 300 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  button: {
    color:"white",
    '&.MuiButton-outlinedSecondary': {
      border: '4px solid white',
    },
  },
}));

export default function AccomodationCard({ accomodation, action }) {
  const classes = useStyles();

  const [role, setRole ] = React.useState(JSON.parse(localStorage.getItem("userRole")))
  const [studentId, setStudentId ] = React.useState(localStorage.getItem("studentId"))
  const [studentBooking, setStudentBooking] = React.useState({})
  const [numberOfDaysStudent, setNumberOfDaysStudent] = React.useState(0)
  const [review, setReview ] = React.useState("")
  const [postReviewFlag, setPostReviewFlag] = React.useState(false)
  const [studentName, setStudentName] = React.useState("")
  const [token, setToken ] = React.useState(localStorage.getItem("token"))

  const navigate = useNavigate()

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReview = (e) =>{
    e.preventDefault()
    setPostReviewFlag(true)
  }

const getStudentBookingNumberOfDays = () =>{
  const temp = accomodation.bookings.filter(booking => booking.student_id === studentId)
  setStudentBooking(temp[0])
  var Difference_In_Time = new Date(temp[0].end_date).getTime() - new Date(temp[0].start_date).getTime()  
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
  setNumberOfDaysStudent(Difference_In_Days)
}

React.useEffect(() => {
  if(role === "Student") getStudentBookingNumberOfDays()
}, [])

useQuery(
  ["postReview", { acc_id: accomodation._id, student_id: studentId, student_name: studentName, review: review, token: token  }],
  postAccomodationReview,{
  onSuccess: (data)=>{
    navigate(0)
  },
  onError: (err) =>{
      console.log(err);
  },
  enabled: postReviewFlag === true,
  }
);

console.log(studentBooking)

  return (
    <Card className={isMobile? classes.mobCard : classes.card}>
         <CardHeader
      className={classes.header}
      title={
        <Typography variant="h5" component="p">
          {accomodation.address}{" "}
        </Typography>
      }
    /> 
    <CardMedia
        className={classes.media}
        image={accomodation.property_images[0] ? `data:${accomodation.property_images[0]?.type};base64,${Buffer.from(accomodation.property_images[0]?.data).toString('base64')}` : prop }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
          {role === "Landlord" &&
          <>
            <Typography variant="h7" component="p">
              <CalendarIcon fontSize="small" />
              Start Availability Date: {accomodation.available_start.substring(0,10)}
              </Typography>
              <Typography variant="h7" component="p">
              End Availability Date: {accomodation.available_end.substring(0,10)}
            </Typography>
            </>
            }

{role === "Student" &&
          <>
            <Typography variant="h7" component="p">
              <CalendarIcon fontSize="small" />
              Start Date: {studentBooking?.start_date?.substring(0,10)}
              </Typography>
              <Typography variant="h7" component="p">
              End Date: {studentBooking?.end_date?.substring(0,10)}
            </Typography>


          <Typography variant="h7" component="p">
              Stay type: {studentBooking.agreement_type}
              </Typography>
            </>
            }

          </Grid>
          <Grid item xs={12}>
            
          <Typography variant="h7" component="p">
              Total Nights Booked: { role === "Student" ? numberOfDaysStudent :accomodation.booked_dates.length}
              </Typography>
          </Grid>
          </Grid>
          </CardContent>
          {role === "Landlord" &&
          <>
       
          <CardActions disableSpacing>
            <IconButton onClick={()=>{action("Delete", accomodation)}}>
            <DeleteIcon /> 
            </IconButton>      
          </CardActions>
          </>
          }
{role === "Student" &&
<div style={{display: "flex", flexDirection:"row", justifyContent:"center"}}>
<Button color="secondary" className={classes.button} variant="outlined" onClick={handleClickOpen}>
  Leave Review
</Button>
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Leave your review below</DialogTitle>
  <DialogContent>
    <DialogContentText>
     What did you think?
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      fullWidth
      label={"Name"}
      variant="standard"
      value={studentName}
      onChange={e => setStudentName(e.target.value)}
    />
    <TextField
      autoFocus
      margin="dense"
      id="name"
      fullWidth
      variant="standard"
      value={review}
      onChange={e => setReview(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleReview}>Post Review</Button>
  </DialogActions>
</Dialog>
</div>
}
   </Card>
  );
}