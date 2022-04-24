import React from 'react'
import { Container, makeStyles, Grid } from '@material-ui/core';
import AccomodationPropertyDetails from '../accomodationPropertyDetails';
import ReservationCard from '../reservationCard';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

function AccomodationDetailsTemplate(props) {

  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const  { accomodationClicked } = props

    const [accTypeClicked, setAccTypeClicked] = React.useState("")

    const [disabled, setDisabled] = React.useState(true)

    const useStyles = makeStyles(theme => ({
        root: {
            height: "80vh",
            width: "30vw",
          }
      }));

const classes = useStyles();

React.useEffect(() => {
  setAccTypeClicked("")
}, [accomodationClicked])


const accomodationTypeClicked = (type) =>{
  setAccTypeClicked(type)
  setDisabled(false)
}

  return (
 
        <Grid container spacing={1}>
        <Grid item xs={isMobile? 12 : 7}>
          <AccomodationPropertyDetails accomodationClicked ={accomodationClicked} accomodationTypeClicked={accomodationTypeClicked}></AccomodationPropertyDetails>
          </Grid>
          <Grid item xs={isMobile? 12: 5}>
            <ReservationCard postingType={accTypeClicked} price={accomodationClicked.price_per_month}
             startDate={accomodationClicked.available_start}
             endDate={accomodationClicked.available_end}
             landlordID={accomodationClicked.landlord_id}
             accomodationID={accomodationClicked._id}
             alreadyBookedDates={accomodationClicked.booked_dates}
             disabled={disabled}
            />
            </Grid>
          </Grid>

  )
}

export default AccomodationDetailsTemplate