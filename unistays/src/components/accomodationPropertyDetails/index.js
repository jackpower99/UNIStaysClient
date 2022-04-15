import React from 'react'
import { Typography, Paper, Chip, Container } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Buffer } from 'buffer';

import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function AccomodationPropertyDetails(props) {

  const role = JSON.parse(localStorage.getItem("user"))?.role;

    const useStyles = makeStyles((theme) => ({
        root: {
            gap: 1,
            margin: 1,
            paddingTop: "1vh",
            '& .MuiTypography-root': {
         
              fontFamily: 'Roboto',
            }
        },
        paper: {
            margin: 2,
            padding: 2,
           // width: "20vw",
        }
    //     chip: {
    //       margin: theme.spacing(0.5),
    //     },
    //     // '& .MuiPaper-root': {
    //     //     backgroundColor: "#FFFFFF",
    //     //     margin: theme.spacing(2),
    //     // }
    }))

    const theme = useTheme();
    const { accomodationClicked, accomodationTypeClicked } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [maxSteps, setMaxSteps] = React.useState(0);



    React.useEffect(() => {
        setMaxSteps(accomodationClicked.property_images.length)
    }, [accomodationClicked])

 
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    const clickedPostingType = (type) =>{
      accomodationTypeClicked(type);
    }

    const classes = useStyles();

if(accomodationClicked !== undefined){
  return (
    <>
<Box sx={{ maxWidth: "32vw", flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={accomodationClicked.property_images.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {accomodationClicked.property_images.map((step, index) => (
          <div key={step.name}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: "25vh",
                  display: 'block',
                //   marginLeft: "auto",
                //   marginRight: "auto",
                  maxWidth: "40vw",
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={`data:${step.type};base64,${Buffer.from(step.data).toString('base64')}`}
                alt={step.name}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
<Container className={classes.root}>
<div style={{display: "flex", flexWrap: "wrap"}}>
<Paper elevation={3} sx={{width:"30vw", padding: 1,  backgroundColor: "#FFF5EE"}}>
<Paper  elevation={1} className={classes.paper}>
    <Typography sx={{fontFamily:"Ariel"}} variant="h7" component="h7">
      Address: 
    </Typography>
    </Paper>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="p">
      {accomodationClicked.address}
    </Typography>
    </Paper>
    </Paper>
    <Paper elevation={3} sx={{display: "flex", flexDirection: "row", marginTop:1, padding: 1, width: "20vw", maxWidth: "20vw",  backgroundColor: "#FFF5EE"}}>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="h7">
      Number of Beds:
    </Typography>
    </Paper>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="p">
      {accomodationClicked.bedroom_count}
    </Typography>
    </Paper>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="h7">
      Number of Baths:
    </Typography>
    </Paper>
  
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="p">
      {accomodationClicked.bathroom_count}
    </Typography>
    </Paper>
    </Paper>
    </div>
    <div style={{display: "flex", flexWrap: "wrap"}}>
    <Paper elevation={3} sx={{ width: "30vw", maxWidth: "30vw",  marginTop:1, padding: 1,  backgroundColor: "#FFF5EE" }}>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="h7">
      Description:
    </Typography>
    </Paper>
    <Paper sx={{height: "10vh"}}elevation={1} className={classes.paper}>
    <Typography variant="h7" component="p">
      {accomodationClicked.description}
    </Typography>
    </Paper>
    </Paper>
    </div>
<>
    <Paper elevation={3} sx={{display: "flex", flexDirection: "row", marginTop:1, padding: 1, width:"15vw", maxWidth: "15vw",  backgroundColor: "#FFF5EE"}}>
    <Paper elevation={1} className={classes.paper}>
    
    <Typography variant="h7" component="h7">
      Price per month: 
    </Typography>
    </Paper>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="p">
      {"€" + accomodationClicked.price_per_month}
    </Typography>
      </Paper>
      </Paper>

      <div style={{display: "flex", flexWrap: "wrap"}}>
      <Paper elevation={3} sx={{display: "flex", flexDirection: "row", marginTop:1, width: "30vw", maxWidth: "30vw", padding: 1, backgroundColor: "#FFF5EE"}}>
      <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="h7">
      Available Start:
    </Typography>
    </Paper>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="p">
      {accomodationClicked.available_start.substring(0,10)}
    </Typography>
    </Paper>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="h7">
      Available End:
    </Typography>
    </Paper>
    <Paper elevation={1} className={classes.paper}>
    <Typography variant="h7" component="p">
      {accomodationClicked.available_end.substring(0,10)}
    </Typography>
    </Paper> 
    </Paper>
    </div>

    <div>

    <Paper elevation={0} sx={{ marginTop:1, padding: 1, display: "flex", flexDirection: "row", justifyContent: 'flex-end'}}>
      
      {accomodationClicked.UNIBNB_available === false && accomodationClicked.UNIFlex_available === false &&
      <Paper onClick={()=> {
        if(role === "Student"){
        clickedPostingType("WS")
        }
      }} elevation={1} sx={{ backgroundColor: "#4bbf75", padding:"4px"}} className={classes.paper}>
    <Typography sx={{color: "white"}} variant="h7" component="h7">
      Whole Semester
    </Typography>
    </Paper>
}

     { accomodationClicked.UNIFlex_available && 
      <Paper onClick={()=> {
        if(role === "Student"){
        clickedPostingType("UNIFlex")
        }
      }} elevation={1} sx={{ backgroundColor: "#FE7E6D", padding:"4px"}} className={classes.paper}>
    <Typography sx={{color: "white"}} variant="h7" component="h7">
      UNIFlex Available
    </Typography>
    </Paper>
}
{ accomodationClicked.UNIBNB_available && 
    <Paper 
    onClick={()=> {
      if(role === "Student"){
        clickedPostingType("UNIBNB") 
      }
    }} elevation={1} sx={{ backgroundColor: "#76dbf5", padding:"4px"}} className={classes.paper}>
    <Typography variant="h7" component="h7">
      UNIBNB Available
    </Typography>
 
    </Paper>
}
    </Paper>

      </div>
    </>


    {/* <Paper component="ul" className={classes.root}>
      <li>
        <Chip label="Genres" className={classes.chip} color="primary" />
      </li>
      {genreNames.map((g) => (
        <li key={g.name}>
          <Chip label={g.name} className={classes.chip} />
        </li>
      ))}
    </Paper> */}
    {/* <Paper component="ul" className={classes.root}>
      <Chip
        icon={<StarRate />}
        label={`${movie.vote_average} (${movie.vote_count}`}
      />
      <Chip label={`Released: ${movie.release_date}`} />
    </Paper> */}
    {/* </div> */}
       </Container>
    </>
  )
}
// else{
//     return(
//         <div>
//             lol
//         </div>
//     )
// }
}
