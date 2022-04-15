import React from 'react'
import { Container, makeStyles, Grid } from '@material-ui/core';
import AccomodationPropertyDetails from '../accomodationPropertyDetails';
import ReservationCard from '../reservationCard';

function AccomodationDetailsTemplate(props) {

    const  { accomodationClicked } = props

    const [accTypeClicked, setAccTypeClicked] = React.useState("")

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
}

  return (
 
        <Grid container spacing={1}>
        <Grid item xs={7}>
          <AccomodationPropertyDetails accomodationClicked ={accomodationClicked} accomodationTypeClicked={accomodationTypeClicked}></AccomodationPropertyDetails>
          </Grid>
          <Grid item xs={5}>
            { accTypeClicked !== "" &&
            <ReservationCard postingType={accTypeClicked} price={accomodationClicked.price_per_month}
             startDate={accomodationClicked.available_start}
             endDate={accomodationClicked.available_end}
             landlordID={accomodationClicked.landlord_id}
             accomodationID={accomodationClicked._id}
             alreadyBookedDates={accomodationClicked.booked_dates}
            />
            }
            </Grid>
          </Grid>

  )
}

export default AccomodationDetailsTemplate