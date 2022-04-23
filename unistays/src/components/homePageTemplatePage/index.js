import React from 'react'
import Map from '../map'
import { Container, Grid, Paper, Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import {useQuery} from "react-query";
import { getAccomodations } from '../../api/api';
import AccomodationDetailsTemplate from '../accomodationDetailsTemplate';
import StripeContainer from '../stripeContainer';
import WelcomePageCard from '../welcomePageCard';
import landingImage from '../../resource/images/landing.avif'
import LandingJPG from '../../resource/images/landingJPG.jpg' 
import Logo from '../../resource/images/logoForHome.png' 
import { alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AgreementCardsDisplay from '../agreementCardsDisplay';
import FilterCard from '../filterCard';

export default function HomePageTemplatePage() {
    const mapContainerStyle = {
        height: '78vh'
      };

      const navigate = useNavigate();

      const [accomodations, setAccomodations] = React.useState([])
      const [accomodationClicked, setAccomodationClicked] = React.useState({});
      const [showFilterCard, setShowFilterCard] = React.useState(false)
      const [filterCardOpen, setFilterCardOpen] = React.useState(false)

      const [token, setToken ] = React.useState(localStorage.getItem("token"))

      const handleStudentSignUpButtonClicked = (e)=>{
        e.preventDefault()
        navigate('/register',{ state:{selectedRole: 'Student'}})
      } 

      const handleLandlordSignUpButtonClicked = (e)=>{
        e.preventDefault()
        navigate('/register',{ state:{selectedRole: 'Landlord'}})
      } 

      const clickedAccomodationCallbackFunction = (accomodation)=>{
        setAccomodationClicked(accomodation);
      }

      const filterAccomodationsCallBack = (accs) =>{
        setAccomodations(accs)
      }

      React.useEffect(() => {
        setAccomodationClicked(accomodations[0])
      }, [accomodations])
      

      const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          },
          paperContainer: {
            position: 'relative',
            height: "140vh",
            width: "100vw",
            marginLeft: 'calc(-50vw + 50%)',
            marginTop: 0,
            overflow: 'hidden',
            '&::before':{
              content: '""',
              backgroundImage: `url(${LandingJPG})`,
              backgroundSize: 'cover',
              position: "absolute",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
              opacity: 0.5,
              
            }
          },
          logo: {
            position: "relative",
            // width: "55vw",
            // height: "45vh",
          },
          createAccount: {
            position: "relative",
            width: "40vw",
          },
          createAccountContainer: {
            width: "40vw",
          
          },
           accountButtons: {
            height: '8vh', 
            width: '15vw',  
            backgroundColor: "#FE7E6D", 
            fontSize: 20,
            hover: "none",
           }
      }));



      const classes = useStyles();

      useQuery(
        ["getAccomodations",{token: token}],
        getAccomodations,{
        onSuccess: (data)=>{
            setAccomodations(data)
        },
        onError: (err) =>{
          console.log(err);
        },
        refetchOnMount: "always",
        }
      );

      console.log(accomodations)

  return (
    <div style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
    <Paper elevation={0}>
    <Paper elevation={1} className={classes.paperContainer}>
      <div className = {classes.root}>
    <img className={classes.logo}  src={Logo} alt="logo"></img>
    </div>
    <div className = {classes.root}>
    <Paper elevation={0} className={classes.createAccountContainer}>
      <Grid container spacing={1}>
      { !token &&
        <>
      <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={6}>
   
    <Button onClick={handleStudentSignUpButtonClicked} sx={{ height: '8vh', width: '15vw',  backgroundColor: "#FE7E6D", fontSize: 20, ":hover": {backgroundColor: "#FE7E6D"}}} type="submit" variant="contained" color="primary">
          Student Account
        </Button>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }}  item xs={6}>
      <Button onClick={handleLandlordSignUpButtonClicked} sx={{ height: '8vh', width: '15vw', backgroundColor: "white", color: '#FE7E6D', fontSize: 20, ":hover": {backgroundColor: "white"}}} type="submit" variant="contained" color="secondary">
        Landlord Account
      </Button>
  
      </Grid>
      </>
        }
      </Grid>
     </Paper>
     <AgreementCardsDisplay />
     </div>
    </Paper>
 
      {/* <AgreementCardsDisplay /> */}

    
    </Paper>

    <Button
     onClick={(()=>{ 
       if(filterCardOpen === false) {setShowFilterCard(true); setFilterCardOpen(true);}
       else{
         setFilterCardOpen(false)
         setShowFilterCard(false)
        }
      })
      } 
     sx={{ height: '7vh', width: '10vw', backgroundColor: "#FE7E6D", color: 'white', fontSize: 15, marginTop: 2, marginBottom:1, ":hover": {backgroundColor: "#FE7E6D"}}} 
     type="submit" 
     variant="contained"
     >
       { filterCardOpen ? "Close Filter Card" : "Filter Accomodations"  }
    </Button>


{ showFilterCard &&
    <FilterCard accomodations={accomodations} filterAccomodationsCallBack={filterAccomodationsCallBack}/>
}

    
    <Grid container spacing={3}>
    <Grid item xs={6}>
  <Map mapStyle={mapContainerStyle} accomodations={accomodations} clickedAccomodationCallbackFunction={clickedAccomodationCallbackFunction}/>
  </Grid>
  <Grid item xs={6}>

{
 accomodationClicked !== null && accomodationClicked !== undefined && Object.getOwnPropertyNames(accomodationClicked).length !== 0 && 
 <AccomodationDetailsTemplate accomodationClicked={accomodationClicked}/>
}

 {/* (accomodationClicked === null || accomodationClicked === undefined || Object.getOwnPropertyNames(accomodationClicked).length === 0) &&
<WelcomePageCard />  */}

  </Grid>
  </Grid>
  </div>
  )
}
