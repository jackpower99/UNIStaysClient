import React, {useState} from 'react'
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import { Container, FormControl, Box, TextField, IconButton, Typography } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import useMediaQuery from "@material-ui/core/useMediaQuery";
// date-fns
import DateAdapter from '@mui/lab/AdapterDateFns';
import { FormLabel } from '@mui/material';
import {DropzoneDialog} from 'material-ui-dropzone'
import { AttachFile, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { set } from 'date-fns';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function VacancyPriceSection(props) {

const {rooms, type, callbackGetPriceSectionDetails} = props;

const [date, setDate] = useState([null, null])
const [costPerNight, setCostPerNight] = useState(0);
const [pricePerMonth, setPricePerMonth] = useState(0)
const [roomNumber, setRoomNumber] = useState(1);
const [roomDescription, setRoomDescription] = useState("")
const [attachFilesFlag, setAttachFilesFlag] = useState(false);
const [files, setFiles] = useState([]);

const [roomsArray, setRoomsArray] = useState([]);
const [UNIFlexChecked, setUNIFlexChecked] = useState(false);
const [UNIBNBChecked, setUNIBNBChecked] = useState(false);

const [roomType, setRoomType] = useState("")
const [sizeSquareMeters, setSizeSquareMeters] = useState(0)


const handleUNIFlexCheckboxChange = (event) => {
  setUNIFlexChecked(event.target.checked);
};

const handleUNIBNBCheckboxChange = (event) => {
  setUNIBNBChecked(event.target.checked);
};

const theme = useTheme();

const isMobile = useMediaQuery(theme.breakpoints.down("md"));

      const handleAttachFiles = e => {
        e.preventDefault();
        setAttachFilesFlag(true);
      }

      const clearFiles = e =>{
        e.preventDefault();
        setFiles({});
      }

      const handleSave = (f) => {
        //Saving files to state for further use and closing Modal
        setFiles(f);
        setAttachFilesFlag(false);
        };

const handleRoomTypeChange = (event) => {
          setRoomType(event.target.value);
        }
  


const handleVancancyPriceSectionSubmitButtonClicked = e =>{
  e.preventDefault();

  if(type === "Rooms"){
  setRoomNumber(roomNumber+1);

  const roomObjectDataEntered = {available_start: date[0], available_end: date[1], room_number: roomNumber, costPerNight: costPerNight, roomDescription: roomDescription, room_images: files, UNIFlexChecked: UNIFlexChecked, UNIBNBChecked: UNIBNBChecked }

  const roomsArrayForAddingRoomObjectsTemp = [...roomsArray, roomObjectDataEntered]
  setRoomsArray(roomsArrayForAddingRoomObjectsTemp)

  if(roomNumber < rooms){
    resetRoomFormFields()
  }
  else{
    callbackGetPriceSectionDetails(roomsArrayForAddingRoomObjectsTemp)
  }
}
else{
    callbackGetPriceSectionDetails({date: date, pricePerMonth: pricePerMonth, sizeSquareMeters: sizeSquareMeters, UNIFlexChecked: UNIFlexChecked, UNIBNBChecked: UNIBNBChecked})
}
}

const resetRoomFormFields = () => {
  setDate([null, null]);
    setRoomDescription("");
    setFiles([]);
    setCostPerNight(0);
}

  return (

    <>
    {/* <Container className={classes.root}> */}
      <div style={{
      display: 'flex',
      flexWrap: "wrap",
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: 8,
      marginTop: 15,
      marginLeft: "15vw",
      }}>

{ type === "Rooms" &&
<Typography variant="h6">
    Room {roomNumber} of {rooms}
        </Typography>
}

       <LocalizationProvider dateAdapter={DateAdapter}>
      {/* <Stack spacing={3}> */}
          {isMobile && 
          
          
        <MobileDateRangePicker
          startText="Availability Start"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
        //   sx={{width: "90vw", flexWrap: "wrap"}}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps}   sx={{width:"10vw"}} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps}   sx={{width:"10vw"}} />
            </React.Fragment>
          )}
        />
          }
           {!isMobile &&
        <DesktopDateRangePicker
          startText="Availability Start"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps}   sx={{width:"10vw"}}/>
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps}   sx={{width:"10vw"}}/>
            </React.Fragment>
          )}
        />
           }
      {/* </Stack> */}
    </LocalizationProvider>

  { type === "Rooms" &&
  <>
    <FormControl>
      <TextField
        label="Cost per night"
        type="number"
        required
        sx={{
          marginLeft: 2,
          width: "10vw"}}
        value={costPerNight}
        onChange={e => setCostPerNight(e.target.value)}
      />
      </FormControl>

<FormControl>
<InputLabel id="demo-simple-select-label">Room Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomType}
                    required
                    sx={{
                      marginLeft: 2,
                      width: "12vw"}}
                    label="Room Type"
                    onChange={handleRoomTypeChange}
                >
                    <MenuItem value={"Double"}>Double</MenuItem>
                    <MenuItem value={"Double en-suite"}>Double en-suite</MenuItem>
                    <MenuItem value={"Single"}>Single</MenuItem>
                    <MenuItem value={"Single en-suite"}>Single en-suite</MenuItem>
                </Select>
                </FormControl>
</>
}

<FormControl>
<TextField
  label="Size Square Meters"
  type="number"
  required
  sx={{
    marginLeft: 2,
    width: "10vw"}}
  value={sizeSquareMeters}
  onChange={e => setSizeSquareMeters(e.target.value)}
/>
</FormControl>

{ type === "Property" &&
    <FormControl>
      <TextField
        label="Price per month"
        type="number"
        required
        sx={{
          marginLeft: 2,
          width: "12vw"}}
        value={pricePerMonth}
        onChange={e => setPricePerMonth(e.target.value)}
      />
      </FormControl>
}
{ type === "Rooms" &&
      <FormControl>
         <TextField style={{height: "10vh", maxHeight:"13vh"}}
        label="Description"
        variant="filled"
        multiline
        maxRows={5}
        type="text"
        required
        sx={{
          marginLeft: 5,
          width: "20vw"}}
        value={roomDescription}
        onChange={e => setRoomDescription(e.target.value)}
      />
      </FormControl>
}

      <FormGroup>
      <FormControlLabel control={<Checkbox onChange={handleUNIFlexCheckboxChange}/>} label="Post as UNIFlex Available" />
      <FormControlLabel control={<Checkbox onChange={handleUNIBNBCheckboxChange}/>} label="Post as UNIBNB Available" />
    </FormGroup>

      </div>

    <Container sx ={{
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: 'flex-end',
  alignItems: 'center'
    }}>

      <FormLabel>Attach documents</FormLabel>
       <IconButton onClick={handleAttachFiles}>
        <AttachFile />
        </IconButton>

        <Typography variant="h6">
          {files.length} file(s) attached
        </Typography>

        <IconButton onClick={clearFiles}>
        <Delete />
        </IconButton>
        <DropzoneDialog 
        dialogTitle={"Add some photos to your listing!"}
        open={attachFilesFlag}
        onClose={() => setAttachFilesFlag(false)}
        onSave={(files) => handleSave(files)}
        showPreviews={true}
        maxFileSize={5000000}
        />

<Button 
  onClick={handleVancancyPriceSectionSubmitButtonClicked} 
  type="submit"
  variant="contained" 
  style={{backgroundColor: "#FE7E6D",  width: "6vw", color: "white", marginTop: "1vh", marginLeft: "3vw"}}>
          Submit
        </Button>

</Container>

</>
 
  )
}
