import React, {useState} from 'react'
import { useTheme } from '@mui/material/styles';
import { Container, FormControl, Box, TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DateAdapter from '@mui/lab/AdapterDateFns';
import { Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function VacancyPriceSection(props) {

const {callbackGetPriceSectionDetails} = props;

const [date, setDate] = useState([null, null])
const [pricePerMonth, setPricePerMonth] = useState(0)

const [UNIFlexChecked, setUNIFlexChecked] = useState(false);
const [UNIBNBChecked, setUNIBNBChecked] = useState(false);

const [sizeSquareMeters, setSizeSquareMeters] = useState(0)


const handleUNIFlexCheckboxChange = (event) => {
  setUNIFlexChecked(event.target.checked);
};

const handleUNIBNBCheckboxChange = (event) => {
  setUNIBNBChecked(event.target.checked);
};

const theme = useTheme();

const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  


const handleVancancyPriceSectionSubmitButtonClicked = e =>{
  e.preventDefault();
    callbackGetPriceSectionDetails({date: date, pricePerMonth: pricePerMonth, sizeSquareMeters: sizeSquareMeters, UNIFlexChecked: UNIFlexChecked, UNIBNBChecked: UNIBNBChecked})
}
  return (

    <>
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

       <LocalizationProvider dateAdapter={DateAdapter}>
          {isMobile && 
          
          
        <MobileDateRangePicker
          startText="Availability Start"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
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
            setDate( newValue);
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
    </LocalizationProvider>

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
