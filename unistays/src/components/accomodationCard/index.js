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
import { IconButton } from "@mui/material";



const useStyles = makeStyles({
  card: { width: "20vw"},
  media: { height: 300 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function AccomodationCard({ accomodation, action }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
        image={`data:${accomodation.property_images[0].type};base64,${Buffer.from(accomodation.property_images[0].data).toString('base64')}`}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h7" component="p">
              <CalendarIcon fontSize="small" />
              Start Availability Date: {accomodation.available_start.substring(0,10)}
              </Typography>
              <Typography variant="h7" component="p">
              End Availability Date: {accomodation.available_end.substring(0,10)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h7" component="p">
              Total Nights Booked: {accomodation.booked_dates.length}
              </Typography>
              <Typography variant="h7" component="p">
              County: {accomodation.county}
            </Typography>
          </Grid>
          </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={()=>{action("Delete", accomodation)}}>
            <DeleteIcon /> 
            </IconButton>      
          </CardActions>
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