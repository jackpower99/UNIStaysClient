import { Container, Box, TextField, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { FormLabel } from '@mui/material';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {DropzoneDialog} from 'material-ui-dropzone'
import { AttachFile, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import VacancyPriceSection from '../vacancyPriceSection';
import {useQuery} from "react-query";
import { postAccomodation } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { red } from "@material-ui/core/colors";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const countiesIreland = [ "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway",
 "Kerry", "Kildare", "Kilkenny", "Laois", 
"Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", 
"Waterford", "Westmeath"
, "Wicklow", "Wexford"]


const collegesIreland = ["Athlone Institute of Technology", "Carlow College"
,"Cork Institute of Technology","Dublin City University",
"Dún Laoghaire Institute of Art, Design and Technology", "Dundalk Institute of Technology", "Galway-Mayo Institute of Technology",
"Institute of Public Administration", "Institute of Technology Carlow", "Institute of Technology Sligo",
"Institute of Technology, Tralee", "Letterkenny Institute of Technology", "Limerick Institute of Technology",
"Marino Institute of Education", "Maynooth University", "National College of Art and Design", "National College of Ireland",
"National University of Ireland, Galway", "National University of Ireland, System", "Royal College of Surgeons in Ireland", "Technological University Dublin",
"Trinity College Dublin, University of Dublin", "University College Cork", "University College Dublin", "University of Limerick",
"Waterford Institute of Technology"] 

const amenities = ["washer and dryer", "air conditioning", "pets allowed", "dishwashed", "balcony", "WiFi", "garden", "TV", "parking"]

function getStyles(college, collegeName, theme) {
    return {
      fontWeight:
        collegeName.indexOf(college) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function PostVacancy() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate()

    const useStyles = makeStyles(theme => ({
        box: {
            display: 'flex',
            flexWrap: "wrap",
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'left',
            alignSelf:"flex-start",
            backgroundColor: theme.palette.common.white,
            width: "40vw",
            gap: 10,
            height:"45vh",
            paddingTop: "10vh",

        '& .MuiFormControl-root':{
            margin: 10,
            width: "17vw",
            gap: 3
        },
        '& .MuiTextField-root':{
          margin: 2,
          width: "17vw",
          gap: 3
      }
    },
        mobile: {
          display: 'flex',
          flexWrap: "wrap",
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: theme.palette.common.white,
          gap: 13,

          '& .MuiFormControl-root':{
            margin: 5,
            width: "65vw",
            gap: 1
        },
        '& .MuiTextField-root':{
          margin: 2,
          width: "65vw",
          gap: 1,
        }
      }
      }));

      const classes = useStyles();

      const collegeLimit = 3;

      const [type, setType] = React.useState('');
      const [numberOfBeds, setNumberOfBeds] = React.useState(0);
      const [numberOfBaths, setNumberOfBaths] = React.useState(0)
      const [county, setCounty] = React.useState('');
      const [maxSelected, setMaxSelected] = React.useState(false);
      const [address, setAddress] = React.useState("");
      const [propertyDescription, setPropertyDescription] = React.useState("");
      const [attachFilesFlag, setAttachFilesFlag] = React.useState(false);
      const [propertyImages, setPropertyImages] = React.useState([]);
      const [zip, setZip] = React.useState("");
      const [collegeNames, setCollegeNames] = React.useState([]);
      const [ammenityNames, setAmenities] = React.useState([]);
      const [submitFlag, setSubmitFlag] = React.useState(false)
      const [disableFormControlsForEdit, setDisableFormControlsForEdit] = React.useState(false)
      
      const [vacancyPriceSectionVisibleFlag, setVacancyPriceSectionVisibleFlag] = React.useState(false)
      const [postTypeForVacancyPriceSection, setPostTypeForVacancyPriceSection] = React.useState("")

      const [uniFlexAvailable, setUniFlexAvailable] = React.useState(false)
      const [uniBNBAvailable, setUniBNBAvailable] = React.useState(false)
      const [postWholeSemester, setPostWholeSemester] = React.useState(false)

      const [date, setDate] = React.useState([null, null])
      const [pricePerMonth, setPricePerMonth] = React.useState(0)
      const [sizeSquareMeters, setSizeSquareMeters] = React.useState(0)
      const [roomsArray, setRoomsArray] = React.useState([]);
      const [token, setToken ] = React.useState(localStorage.getItem("token"))
      const [fail, setFail] = React.useState(false);

      const [lat, setLat] = React.useState(0);
      const [lng, setLng] = React.useState(0);

      const landlordID = localStorage.getItem("landlordId");

      console.log(landlordID)

      useQuery(
        ["postAccomodation", { 
          landlordId: landlordID,
          address: address, 
          posting_type: postTypeForVacancyPriceSection,
          county :county,
          zip: zip,
          lat: lat,
          lng: lng,
          size_sq_meters: sizeSquareMeters,
          colleges: collegeNames,
          description: propertyDescription,
          bedroom_count: numberOfBeds,
          bathroom_count: numberOfBaths,
          property_type: type,
          available_start: moment(date[0]).zone('+01:00'),
          available_end:moment(date[1]).zone('+01:00'),
          UNIFlex_available: uniFlexAvailable,
          UNIBNB_available: uniBNBAvailable,
          property_images: propertyImages,
          amenities: ammenityNames,
          price_per_month: pricePerMonth,
          rooms: roomsArray,
          token: token
        }],
        postAccomodation,{
        onSuccess: (data)=>{
          console.log(data);
          navigate("/", { replace: true})
          setSubmitFlag(false)
        },
        onError: (err) =>{
          console.log(err);
        },
          enabled: submitFlag === true,
          cacheTime: 10000
        }
      );

      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            visibility: maxSelected ? "hidden" : "visible" ,
          },
        },
      };

      const MenuPropsAmen = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
          },
        },
      };

      const handleAttachFiles = e => {
        e.preventDefault();
        setAttachFilesFlag(true);
      }

      const clearFiles = e =>{
        e.preventDefault();
        setPropertyImages({});
      }

      const handleSave = (f) => {
        //Saving files to state for further use and closing Modal
        setPropertyImages(f);
        setAttachFilesFlag(false);
        };

        const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setFail(false);
        };

      const handleChange = (event) => {
        setType(event.target.value);
      };

      const handleCountyChange = (event) => {
        setCounty(event.target.value);
      }

      const handleBedsChange = (event) => {
        setNumberOfBeds(event.target.value);
      }

      const handleBathsChange = (event) => {
        setNumberOfBaths(event.target.value);
      }

      const handleCollegeChange = (event) => {
        const {
          target: { value },
        } = event;

        const val = typeof value === 'string' ? value.split(',') : value;
        setCollegeNames(val);
      };

      console.log(collegeNames);

      const handleCollegeDelete = (deleteCollege) => {
        setCollegeNames(collegeNames.filter(college => college !==  deleteCollege));
      }

      React.useEffect(() => {
          if(collegeNames.length >= collegeLimit){
              setMaxSelected(true)
          }
          else{
              setMaxSelected(false);
          }
      }, [collegeNames])


      const handleAmenitiesChange = (event) => {
        
        const {
          target: { value },
        } = event;

        const val = typeof value === 'string' ? value.split(',') : value;
        setAmenities(val);
      };

      const handleAmenitiesDelete = (deleteAmen) => {
        setAmenities(ammenityNames.filter(amen => amen !==  deleteAmen));
      }

      const handleClickOpen = () => {
        if(!disableFormControlsForEdit){
          setDisableFormControlsForEdit(true);
          setVacancyPriceSectionVisibleFlag(true);
        }
        else{
       setDisableFormControlsForEdit(!disableFormControlsForEdit)
        }
     
      };

      const handleSubmit =  async () => {
        if(zip !== "" && address !== "" && date){
          console.log(1111)
          setSubmitFlag(true);
        }
          else{
            setFail(true)
            console.log("failed accomodation upload")
          }
        }

      const getPriceSectionValues = async (values) =>{
        console.log(values)
          const res = await getLatLng();
          setLat(res.results[0].geometry.location.lat)
          setLng(res.results[0].geometry.location.lng)
          setDate(values.date)
          setPricePerMonth(values.pricePerMonth)
          setSizeSquareMeters(values.sizeSquareMeters)
          setUniBNBAvailable(values.UNIBNBChecked)
          setUniFlexAvailable(values.UNIFlexChecked)
          handleSubmit()
      }

      const getLatLng = async() => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyBr79tHPtjDXaDwrmDnyAZzgjGfCJV273w`,{
          method: "GET",
      });
      const content = await response.json();
      console.log(content)
      return content;
      }

  return (
    <div style={{display: "flex", flexDirection:"column"}}>

          <Box className={ isMobile ? classes.mobile : classes.box}>

      <FormControl disabled = {disableFormControlsForEdit}>
        <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Property Type"
                    onChange={handleChange}
                >
                    <MenuItem value={"Apartment"}>Apartment</MenuItem>
                    <MenuItem value={"House"}>House</MenuItem>
                    <MenuItem value={"Townhouse"}>Townhouse</MenuItem>
                </Select>
                </FormControl>

     <FormControl disabled = {disableFormControlsForEdit}>
        <InputLabel id="demo-multiple-chip-label">Colleges</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={collegeNames}
          onChange={handleCollegeChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                onDelete={ () => handleCollegeDelete(value)}
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
                key={value} label={value} size = "small" sx={{fontSize: 10}} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {collegesIreland.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, collegeNames, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
      
    <FormControl>
      <TextField
        label="Address"
        variant="filled"
        multiline
        maxRows={3}
        type="text"
        required
        disabled = {disableFormControlsForEdit}
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      </FormControl>
    <FormControl disabled = {disableFormControlsForEdit}>
        <InputLabel id="demo-simple-select-label">County</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={county}
                    required
                    label="County"
                    onChange={handleCountyChange}
                >
                    {countiesIreland.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
                </Select>
                </FormControl>
    <FormControl>
      <TextField
        label="Zip Code"
        type="text"
        required
        disabled = {disableFormControlsForEdit}
        value={zip}
        onChange={e => setZip(e.target.value)}
      />
      </FormControl>

    <FormControl disabled = {disableFormControlsForEdit}>
        <InputLabel id="demo-simple-select-label">Beds</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={numberOfBeds}
                    label="Property Type"
                    onChange={handleBedsChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                </Select>
                </FormControl>

    <FormControl disabled = {disableFormControlsForEdit}>
        <InputLabel id="demo-simple-select-label">Bathrooms</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={numberOfBaths}
                    label="Property Type"
                    onChange={handleBathsChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                </Select>
                </FormControl>
      <FormControl>
         <TextField style={{height: "20vh", maxHeight:"20vh"}}
        label="Description"
        variant="filled"
        multiline
        maxRows={5}
        type="text"
        required
        disabled = {disableFormControlsForEdit}
        value={propertyDescription}
        onChange={e => setPropertyDescription(e.target.value)}
      />
      </FormControl>

      <FormControl disabled = {disableFormControlsForEdit}>
        <InputLabel id="demo-multiple-chip-label">Amenities</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={ammenityNames}
          onChange={handleAmenitiesChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                onDelete={ () => handleAmenitiesDelete(value)}
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
                key={value} label={value} size = "small" sx={{fontSize: 14}} />
              ))}
            </Box>
          )}
          MenuProps={MenuPropsAmen}
        >
          {amenities.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, ammenityNames, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
      </Box>  
 

<Container sx ={{
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: 'flex-end',
  alignItems: 'center',
}}>
      <FormLabel>Attach documents</FormLabel>
       <IconButton disabled={disableFormControlsForEdit} onClick={handleAttachFiles}>
        <AttachFile />
        </IconButton>

        <Typography variant="h6">
          {propertyImages.length} file(s) attached
        </Typography>

        <IconButton disabled={disableFormControlsForEdit} onClick={clearFiles}>
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
  onClick={handleClickOpen} 
  type="submit"
  variant="contained" 
  style={{backgroundColor: "#FE7E6D",  width: "6vw", color: "white", marginTop: "1vh", marginLeft: "3vw"}}>
          {disableFormControlsForEdit ? "Edit" : "Submit"}
        </Button>

</Container>

{ vacancyPriceSectionVisibleFlag && 
        <VacancyPriceSection callbackGetPriceSectionDetails={getPriceSectionValues} />
}

<Snackbar open={fail} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Oops! Unable to Submit your details! Check your details and try again..
        </Alert>
        </Snackbar>
</div>
)
}
