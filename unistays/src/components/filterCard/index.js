import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper, TextField, FormGroup, FormControlLabel, Button, Radio, RadioGroup } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const collegesIreland = ["Athlone Institute of Technology", "Carlow College"
,"Cork Institute of Technology","Dublin City University",
"Dún Laoghaire Institute of Art, Design and Technology", "Dundalk Institute of Technology", "Galway-Mayo Institute of Technology",
"Institute of Public Administration", "Institute of Technology Carlow", "Institute of Technology Sligo",
"Institute of Technology, Tralee", "Letterkenny Institute of Technology", "Limerick Institute of Technology",
"Marino Institute of Education", "Maynooth University", "National College of Art and Design", "National College of Ireland",
"National University of Ireland, Galway", "National University of Ireland, System", "Royal College of Surgeons in Ireland", "Technological University Dublin",
"Trinity College Dublin, University of Dublin", "University College Cork", "University College Dublin", "University of Limerick",
"Waterford Institute of Technology"] 

const countiesIreland = [ "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway",
 "Kerry", "Kildare", "Kilkenny", "Laois", 
"Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", 
"Waterford", "Westmeath"
, "Wicklow", "Wexford"]

export default function FilterCard(props) {

    const { accomodations, filterAccomodationsCallBack } = props

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: "wrap",
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
            width: "45vw",
            height:"50vh",
            marginTop:"2vh",
            marginBottom:"2vh",
            padding: 20,

        '& .MuiFormControl-root':{
            width: "30vw",
        }
    }
    }))

    const classes = useStyles();

    const [college, setCollege] = React.useState('');
    const [county, setCounty] = React.useState('');
    const [beds, setBeds] = React.useState(0);
    const [baths, setBaths] = React.useState(0);
    const [propertyType, setPropertyType] = React.useState('');
    const [priceMin, setPriceMin] = React.useState(0);
    const [priceMax, setPriceMax] = React.useState(0);
    const [UNIFlex, setUNIFlex] = React.useState(false);
    const [UNIBNB, setUNIBNB] = React.useState(false);
    const [wholeSemester, setWholeSemester] = React.useState(false);
    const [value, setValue] = React.useState("")

    const handleCollegeChange = (event) => {
        setCollege(event.target.value);
      };

    const handleCountyChange = (event) => {
        setCounty(event.target.value);
      };

      const handleBedsChange = (event) => {
        setBeds(event.target.value);
      };

      const handleBathsChange = (event) => {
        setBaths(event.target.value);
      };

      const handlePropertyTypeChange = (event) => {
        setPropertyType(event.target.value);
      };

      const handleRadioChange =(e)=>{
          setValue(e.target.value)
          if(e.target.value === 'UNIFlex Available') setUNIFlex(true);
          if(e.target.value === 'UNIBNB Available') setUNIBNB(true);
          if(e.target.value === 'Whole Semester Available') setWholeSemester(true);
      }

      const clearFilters =()=>{
        filterAccomodationsCallBack(accomodations, "Clear")
        setCollege("")
        setCounty("")
        setBeds(0)
        setBaths(0)
        setPropertyType("")
        setPriceMin(0)
        setPriceMax(0)
        setUNIFlex(false)
        setUNIBNB(false)
        setWholeSemester(false)
        setValue("")
      }

      const filterAccomodations = (e) =>{
          e.preventDefault()

          var temp = accomodations
            .filter(acc => {
                if(county === ""){
                    return true
                }
                else if(acc.county === county){
                    return true
                }
                return false;
            })
            .filter(acc => {
                if(college === ""){
                    return true
                }
                else if(acc.colleges.includes(college)){
                    return true
                }
                return false;
            })
            .filter(acc => {
                if(beds === 0){
                    return true
                }
                else if(acc.bedroom_count === beds){
                    return true
                }
                return false;
            })
            .filter(acc => {
                if(baths === 0){
                    return true
                }
                else if(acc.bathroom_count === baths){
                    console.log(acc.bathroom_count)
                    return true
                }
                //console.log(acc.bathroom_count)
                return false;
            })
            .filter(acc => {
                if(propertyType === ''){
                    return true
                }
                else if(acc.property_type === propertyType){
                    return true
                }
                return false;
            })
            .filter(acc => {
                if(priceMin === 0 && priceMax === 0){
                    return true
                }
                else if(acc.price_per_month > priceMin && acc.price_per_month < priceMax){
                    return true
                }
                return false;
            })
            .filter(acc => {
                if(value === ""){
                    return true
                }
                else if(acc.UNIFlex_available && UNIFlex){
                    return true
                }
                else if(acc.UNIBNB_available && UNIBNB){
                    return true
                }
                else if((acc.UNIFlex_available === false) && (acc.UNIBNB_available === false) && wholeSemester){
                    return true
                }
                return false;
            })
           filterAccomodationsCallBack(temp, "Filter")
        }

  return (
   <Paper elevation={20} className={classes.root}>
       <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">College</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={college}
          label="College"
          onChange={handleCollegeChange}
        >
        { collegesIreland.map((col) => (           
          <MenuItem value={col}>{col}</MenuItem>
            ))
        }
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">County</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={county}
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
    </Box>


    <Box sx={{ width: "30vw", display:"flex" , flexDirection:"row", justifyContent: "center", alignItems: "center"}}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Beds</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={beds}
          label="Beds"
          onChange={handleBedsChange}
          sx={{width: "14vw"}}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>

      <FormControl >
        <InputLabel id="demo-simple-select-label">Baths</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={baths}
          label="Baths"
          onChange={handleBathsChange}
          sx={{width: "15vw"}}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={propertyType}
          label="Property Type"
          onChange={handlePropertyTypeChange}
        >
          <MenuItem value={"Apartment"}>Apartment</MenuItem>
          <MenuItem value={"House"}>House</MenuItem>
          <MenuItem value={"Townhouse"}>Townhouse</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ width: "30vw", display:"flex" , flexDirection:"row",justifyContent: "center", alignItems: "center"}}>
    <FormControl>
      <TextField
        label="min price"
        type="number"
        value={priceMin}
        sx={{maxWidth: "14vw"}}
        onChange={e => setPriceMin(e.target.value)}
      />
      </FormControl>

      <FormControl>
      <TextField
        label="max price"
        type="number"
        value={priceMax}
        sx={{maxWidth: "15vw"}}
        onChange={e => setPriceMax(e.target.value)}
      />
      </FormControl>

      </Box>


      <FormGroup  sx={{ width: "40vw", display:"flex" , flexDirection:"row", flexWrap:"nowrap", alignItems: "center", justifyContent: "center"}}>
      <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="UNIFlex Available"
    name="radio-buttons-group"
    value={value}
    onChange={handleRadioChange}
  >
      <FormControlLabel value="UNIFlex Available" control={<Radio/>}label="UNIFlex Available" />
      <FormControlLabel value="UNIBNB Available" control={<Radio/>} label="UNIBNB Available" />
      <FormControlLabel value="Whole Semester Available" control={<Radio/>} label="Whole Semester Available" />

      </RadioGroup>
    </FormGroup>


    <Button 
  onClick={filterAccomodations} 
  type="submit"
  variant="contained" 
  style={{backgroundColor: "#FE7E6D",  width: "6vw", color: "white", marginTop: "1vh", marginLeft: "3vw"}}>
      Search
        </Button>

        <Button 
  onClick={clearFilters} 
  type="submit"
  variant="contained" 
  style={{backgroundColor: "white",  width: "6vw", color: "#FE7E6D", marginTop: "1vh", marginLeft: "3vw"}}>
      Clear
        </Button>
   </Paper>
  )
}
