import React, { useContext  } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { Buffer } from 'buffer';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Box, Paper } from "@mui/material";
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import { flexbox } from "@mui/system";
import { uploadStudentProfilePicture } from '../../api/api';
import temp from '../../resource/images/landingJPG.jpg'

const useStyles = makeStyles({
  card: { 
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "20vw", 
    height: "23vh", 
    marginBottom: 10},
  media: { height: 200 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function StudentCard({ student, action, type }) {
  const classes = useStyles();


  return (
    <Card className={classes.card}>
         <Box
                component="img"
                sx={{
                  height: "7vh",
                  width: '5vw',
                  marginTop: 1,
                  alignSelf: 'center',
                  border: '1px solid white',
                  borderRadius: "10px",
                  overflow: 'none',
                }}
                src={student.profile_picture?.data !== undefined  ? `data:${student.profile_picture.type};base64,${Buffer.from(student.profile_picture.data).toString('base64')}` : temp}
                alt={student.profile_picture?.name}
              />
      <CardContent>
       
        <Paper sx={{display: "flex", flexDirection: "column", alignItems: "flex-start",  backgroundColor: "#f2c8c2", color:"white",   justifyContent: 'flex-start',padding:1}}>
        <Grid container>
          <Grid item xs={8}>
          {/* <Grid item xs={12}>
            <Typography variant="h7" component="p">
              <CalendarIcon fontSize="small" />
              Start Availability Date: {student.fname}
              </Typography>
              <Typography variant="h7" component="p">
              End Availability Date: {student.lname}
            </Typography>
          </Grid> */}
        
          <Typography variant="h7" component="p">
             Name: {student.fname} {student.lname}
            </Typography>
     
            {/* <Grid item xs={12}>
          <Typography variant="h7" component="p">
             Email: {student.student_email}
            </Typography>
            </Grid> */}
      
          <Typography variant="h7" component="p">
              College: {student.college}
              </Typography>
         
     
              <Typography variant="h7" component="p">
              Year of Study: {student.year_of_study}
            </Typography>
  
  </Grid>
      
      { type === "Users" && 

<Grid item xs={4}>
  <div style={{display: "flex", flexDirection: "column",alignItems: "flex-end",justifyContent: 'center'}}>
          <CardActions disableSpacing>
      <IconButton  aria-label="add to favorites" onClick={ (() => {action("add",student)})}>
        <PersonAddTwoToneIcon color="black" fontSize="large" />
    </IconButton>
          </CardActions>
          </div>
          </Grid>
      
}
</Grid>
</Paper>
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton onClick={()=>{action("Delete", accomodation)}}>
            <DeleteIcon /> 
            </IconButton>      
          </CardActions> */}
          {/* <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(movie)}
      {/* <IconButton aria-label="add to favorites" onClick={handleAddToFavorite}>
        <FavoriteIcon color="primary" fontSize="large" />
    </IconButton> */}
        {/* <Link to={`/movies/${movie.id}`}>
        <Button variant="outlined" size="medium" color="primary">
          More Info ...
        </Button>
    //     </Link> */}
    {/* //   </CardActions> */}
     </Card>
  );
}