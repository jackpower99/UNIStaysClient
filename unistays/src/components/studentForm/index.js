import * as React from "react";
import { Container, IconButton, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import logo from "../../resource/images/mainLogo.png";
import { studentDetails, landlordDetails } from "../../api/api";
import {useQuery} from "react-query";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { red } from "@material-ui/core/colors";
import { FormLabel, Hidden } from '@mui/material';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Check, CheckBox, WrapText } from "@material-ui/icons";
import Checkbox from '@mui/material/Checkbox';
import {DropzoneDialog} from 'material-ui-dropzone'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { fontSize } from "@mui/system";
import { useLocation } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      gap: "20px",
      maxHeight: "400px",
      padding:"50px",
      maxWidth: "100vw",
  
      '& .MuiTextField-root': {
        width: "20vw",
      },
      '& .MuiFormLabel-root':{
        padding: "10px 0 0 0"
      },
      '& h6': {
        color: red
      },
    },
    landord: {
      display: 'flex',
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      gap: "15px",
      maxHeight: "35vh",
      padding:"60px",
      maxWidth: "100vw",
  
      '& .MuiTextField-root': {
        width: "20vw",
        height: "5vh"
      },
      '& .MuiFormLabel-root':{
        padding: "10px 0 0 0",
      },
      '& h6': {
        color: red
      },
    }
  }));



export default function StudentForm() {

  const location = useLocation()
  const role   = location.state.role;
  const email = location.state.email;

  console.log(email)

    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [college, setCollege] = React.useState("");
    const [yearOfStudy, setYearOfStudy] = React.useState("");
    const [allowShowLocation, setAllowShowLocation] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const [userRole, setUserRole] = React.useState(role);
 
    const [submitFlag, setSubmitFlag] = React.useState(false);
    const [submitLandlordFlag, setSubmitLandlordFlag] = React.useState(false);
    const [token, setToken ] = React.useState(localStorage.getItem("token"))
    const [attachFilesFlag, setAttachFilesFlag] = React.useState(false);

    const [fail, setFail] = React.useState(false);

    const theme = useTheme();

    const navigate = useNavigate();


      const isMobile = useMediaQuery(theme.breakpoints.down("md"));

      const classes = useStyles();

      useQuery(
        ["studentDetails", { 
          student_email: email,
          fname: fname, 
          lname:lname,
          address:address,
          date_of_birth: dateOfBirth,
          phone_number: phoneNumber,
          college: college,
          year_of_study: yearOfStudy,
          allow_show_location: allowShowLocation,
          documents: files, 
        }],
        studentDetails,{
        onSuccess: (data)=>{
          console.log(data);
            setSubmitFlag(false)
            navigate("/");
        },
        onError: (err) =>{
          console.log(err);
          setFail(true);
        },
          enabled: submitFlag === true,
          cacheTime: 10000
        }
      );

      useQuery(
        ["landlordDetails", { 
          email: email,
          fname: fname, 
          lname:lname,
          address:address,
          date_of_birth: dateOfBirth,
          phone_number: phoneNumber,
          documents: files
        }],
        landlordDetails,{
        onSuccess: (data)=>{
          console.log(data)
            setSubmitLandlordFlag(false)
            navigate("/");
        },
        onError: (err) =>{
          console.log(err);
          setFail(true);
        },
          enabled: submitLandlordFlag === true,
          cacheTime: 10000
        }
      );

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setFail(false);
      };

      const handleSubmit = e => {
        e.preventDefault();
        console.log(email);
        submitForm();
      };

      const handleAttachFiles = e => {
        e.preventDefault();
        setAttachFilesFlag(true);
      }

      const handleSave = (f) => {
        //Saving files to state for further use and closing Modal
        setFiles(f);
        setAttachFilesFlag(false);
        };

    const submitForm = async () =>{

      if(fname === "" && lname === "" && address === "" && dateOfBirth === ""){
        setFail(true)
    }
    else{
            if(userRole === "Student"){
              setSubmitFlag(true);
            }
            else if(userRole === "Landlord"){
              setSubmitLandlordFlag(true);
            }
            else{
              console.log("Unable to Submit");
              setFail(true);
            }
        }
    };
    
    const clearFiles = e =>{
      e.preventDefault();
      setFiles({});
    }

return (
    <>
    <Container >

    <div style={{
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
    }}>
    <img src={logo} sx={{
   display: 'flex',
   flexDirection: "column",
   alignItems: "center",
 }} alt="logo"></img>
    </div>

   <form id="form"  className={ userRole=== "Student" ? classes.root : classes.landord}>
   {userRole === "Student" &&  
   <>
<FormLabel>First Name</FormLabel>
      <TextField
        label="First Name"
        variant="filled"
        type="text"
        required
        value={fname}
        onChange={e => setFname(e.target.value)}
      />

       <FormLabel>Address</FormLabel>
         <TextField style={{height: "170px", maxHeight:"170px"}}
        label="Address"
        variant="filled"
        multiline
        maxRows={8}
        type="text"
        required
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
<FormLabel>Last Name</FormLabel>
         <TextField
        label="Last Name"
        variant="filled"
        type="text"
        required
        value={lname}
        onChange={e => setLname(e.target.value)}
      />  
   <FormLabel>College</FormLabel>
         <TextField
        label="College"
        variant="filled"
        type="text"
        required
        value={college}
        onChange={e => setCollege(e.target.value)}
      />
       <FormLabel>Phone Number</FormLabel>
         <TextField
        label="Phone Number"
        variant="filled"
        type="text"
        required
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />    

<FormLabel>Date of Birth</FormLabel>
         <TextField
        label="Date of Birth"
        variant="filled"
        type="text"
        required
        value={dateOfBirth}
        onChange={e => setDateOfBirth(e.target.value)}
      /> 

       <FormLabel>Year of Study</FormLabel>
         <TextField
        label="Year of Study"
        variant="filled"
        type="text"
        required
        value={yearOfStudy}
        onChange={e => setYearOfStudy(e.target.value)}
      />
      </>
}
{userRole === "Landlord" &&  
<>

<FormLabel>First Name</FormLabel>
<TextField
        label="First Name"
        variant="filled"
        type="text"
        required
        value={fname}
        onChange={e => setFname(e.target.value)}
      />
 

       <FormLabel>Address</FormLabel>
         <TextField style={{height: "155px", maxHeight:"155px"}}
        label="Address"
        variant="filled"
        multiline
        maxRows={8}
        type="text"
        required
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

<FormLabel>Last Name</FormLabel>
         <TextField
        label="Last Name"
        variant="filled"
        type="text"
        required
        value={lname}
        onChange={e => setLname(e.target.value)}
      />  
        
        <FormLabel>Date of Birth</FormLabel>
         <TextField
        label="Date of Birth"
        variant="filled"
        type="text"
        required
        value={dateOfBirth}
        onChange={e => setDateOfBirth(e.target.value)}
      /> 
     
       <FormLabel>Phone Number</FormLabel>
         <TextField
        label="Phone Number"
        variant="filled"
        type="text"
        required
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      /> 
    </>  
    }
</form>
    <div style={{
             display: 'flex',
             flexDirection: "row",
             flexWrap: "wrap",
             justifyContent: "flex-end",
             alignItems: "center",
             paddingRight: "1vw",
             alignContent: "center",
             gap: "2px",
          }}>
             {userRole === "Student" &&  
       <FormLabel>Allow Share Location? </FormLabel>
        }
          {userRole === "Student" &&  
       <input type="checkbox" onChange = {e => setAllowShowLocation(!allowShowLocation)} style={{margin: "10px 70px 0 0"}}/>
      }
       <FormLabel>Attach documents</FormLabel>
       <IconButton onClick={handleAttachFiles}>
        <AttachFileIcon />
        </IconButton>

        <Typography variant="h6">
          {files.length} file(s) attached
        </Typography>

        <IconButton onClick={clearFiles}>
        <DeleteIcon />
        </IconButton>
        
        <Button onClick={handleSubmit} type="submit" variant="contained" style={{backgroundColor: "#FE7E6D",  width: "6vw", color: "white", marginTop: "1vh", marginLeft: "3vw"}}>
          Submit
        </Button>
      </div>
      
    </Container>
        <Snackbar open={fail} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Oops! Unable to Submit your details! Check your details and try again..
        </Alert>
        </Snackbar>

        <DropzoneDialog 
        dialogTitle={"Upload any documents you would like landlords to see here."}
        open={attachFilesFlag}
        onClose={() => setAttachFilesFlag(false)}
        onSave={(files) => handleSave(files)}
        showPreviews={true}
        maxFileSize={5000000}
        />
  </>
)
}
