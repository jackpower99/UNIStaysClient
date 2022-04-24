import React from 'react';
import { useQuery } from 'react-query';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { Buffer } from 'buffer';
import {DropzoneDialog} from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core';
import FriendListContainer from '../friendListContainer';
import { uploadStudentProfilePicture, uploadLandlordProfilePicture } from '../../api/api';
import prop from '../../resource/images/Portrait_Placeholder.png'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';

export default function DisplayDetails( { role, user } ) {

  const [attachFilesFlag, setAttachFilesFlag] = React.useState(false);
  const [uploadStudentProfilePictureFlag, setUploadStudentProfilePictureFlag] = React.useState(false);
  const [uploadLandlordProfilePictureFlag, setUploadLandlordProfilePictureFlag] = React.useState(false);
  const [userImage, setUserImages] = React.useState([]);
  const [objURL, setObjURL] = React.useState("")
  const [token, setToken ] = React.useState(localStorage.getItem("token"))
  const navigate = useNavigate()


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAttachFiles = e => {
    e.preventDefault();
    setAttachFilesFlag(true);
  }

  useQuery(
    ["uploadProfilePictureStudent", { 
      student_email: user.student_email,
      documents: userImage,
      token: token
    }],
    uploadStudentProfilePicture,{
    onSuccess: (data)=>{
      console.log(data);
      setUploadStudentProfilePictureFlag(false)
      navigate(0)
      
    },
    onError: (err) =>{
      console.log(err);
      setUploadStudentProfilePictureFlag(false)
    },
      enabled: uploadStudentProfilePictureFlag === true,
      cacheTime: 10000
    }
  );

  useQuery(
    ["uploadProfilePictureLandlord", { 
      email: user.email,
      documents: userImage,
      token: token
    }],
    uploadLandlordProfilePicture,{
    onSuccess: (data)=>{
      console.log(data);
      setUploadLandlordProfilePictureFlag(false)
      navigate(0)
    },
    onError: (err) =>{
      console.log(err);
      setUploadLandlordProfilePictureFlag(false)
    },
      enabled: uploadLandlordProfilePictureFlag === true,
      cacheTime: 10000
    }
  );

  console.log(Math.floor((new Date() - new Date(user.date_of_birth).getTime()) / 3.15576e+10))

  const handleSave = (f) => {
    //Saving files to state for further use and closing Modal
    setUserImages(f);
    setObjURL(URL.createObjectURL(f[0]))
    setAttachFilesFlag(false);
    if(role === "Student"){
       setUploadStudentProfilePictureFlag(true)
    }
    else{
      setUploadLandlordProfilePictureFlag(true)
    }
    };

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: "2vh",
      gap: 10,
      minHeight: "85vh",
      width: "50vw",
      },
      typography:{
        fontSize: "15px"
      },
      mobRoot:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "2vh",
        gap: 10,
        minHeight: "85vh",
        width: "70vw",
      }
  }));

  const classes = useStyles();

  return (
<>
{ !isMobile && 

 <div style={{display: "flex", flexDirection:"row", justifyContent: "center", alignItems:"center", flexWrap:"nowrap", gap:40, marginTop:20 }}> 

    <Paper elevation={20} sx={{ backgroundColor: "#f2c8c2", borderRadius: "10px"}}className={classes.root}>
      <Box
                component="img"
                sx={{
                  height: "25vh",
                  width: '20vw',
                  marginTop: 1,
                  alignSelf: 'center',
                  marginLeft: "20px",
                  border: '5px solid white',
                  borderRadius: "10px",
                  overflow: 'none',
                }}
                src={ user.profile_picture  ? `data:${user.profile_picture?.type};base64,${Buffer.from(user.profile_picture?.data).toString('base64')}` : userImage[0] ? objURL: prop}
                alt={user.profile_picture?.name}
                onClick={handleAttachFiles}
              />
          

        <DropzoneDialog 
        dialogTitle={"Select a profile image!"}
        open={attachFilesFlag}
        onClose={() => setAttachFilesFlag(false)}
        onSave={(files) => handleSave(files)}
        showPreviews={true}
        maxFileSize={5000000}
        />

<Typography sx={{alignSelf:"flex-start", marginLeft:4, marginTop:3, fontFamily:'"Segoe UI"', color:"white"}} variant='h4'>{user.fname} {user.lname}'s Profile</Typography>

          <Paper sx={{display: "flex", flexDirection: "column", flexWrap:"wrap", alignItems:"flex-start",minWidth:"35vw",gap:2, marginTop: 3, marginLeft: 3, height:"30vh", padding: 5 }}>
   
   { role === "Student" &&
   <>
            <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='h6'>College: {user.college}</Typography>   
            <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='h6'>Year of Study: {user.year_of_study}</Typography>
             </>
             }
            <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='h6'>Date of Birth: {user.date_of_birth}</Typography>
 
            <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='h6'>Age: { Math.floor((new Date() - new Date(user.date_of_birth).getTime()) / 3.15576e+10) }</Typography>

            <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}}  variant='h6'>Address: {user.address}</Typography>

            <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='h6'>Phone: {user.phone_number}</Typography>
   
      <Divider></Divider>
 
      </Paper>
    

      <Paper sx={{display: "flex", flexDirection: "column", flexWrap:"wrap", justifyContent:"center", alignItems:"center",width:"35vw",gap:2, marginTop: 3, marginLeft: 3, maxHeight:"50vh", padding: 3 }}>

      <Typography variant='h5'>Documents</Typography>
   
      { user.documents?.length > 0 &&

        <div style={{display: "flex", flexDirection: "row", flexWrap:"wrap",  alignItems:"center",width:"35vw",gap:4, marginTop: 3, maxHeight:"50vh", padding: 5 }}>
        { user?.documents?.map((doc, key) => (
          <iFrame style={{height: "20vh"}} key={key} src={`data:${doc?.type};base64,${Buffer.from(doc?.data).toString('base64')}`} />
        ))
      }
      
        </div>
}
</Paper>
</Paper>
     
            { role ==="Student" && 
            <FriendListContainer />

}
</div>
}


{ isMobile && 
<div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center", flexWrap:"nowrap", gap:20, marginTop:20 }}> 

<Paper elevation={20} sx={{ backgroundColor: "#f2c8c2", borderRadius: "10px"}}className={classes.mobRoot}>
  <Box
            component="img"
            sx={{
              height: "25vh",
              width: '40vw',
              marginTop: 1,
              alignSelf: 'center',
              marginLeft: "20px",
              border: '5px solid white',
              borderRadius: "10px",
              overflow: 'none',
            }}
            src={ user.profile_picture  ? `data:${user.profile_picture?.type};base64,${Buffer.from(user.profile_picture?.data).toString('base64')}` : userImage[0] ? objURL: prop}
            alt={user.profile_picture?.name}
            onClick={handleAttachFiles}
          />
      

    <DropzoneDialog 
    dialogTitle={"Select a profile image!"}
    open={attachFilesFlag}
    onClose={() => setAttachFilesFlag(false)}
    onSave={(files) => handleSave(files)}
    showPreviews={true}
    maxFileSize={5000000}
    />

<Typography sx={{alignSelf:"flex-start", marginLeft:4, marginTop:3, fontFamily:'"Segoe UI"', color:"white"}} variant='h6'>{user.fname} {user.lname}'s Profile</Typography>

      <Paper sx={{display: "flex", flexDirection: "column", flexWrap:"nowrap", justifyContent: "center", alignItems:"flex-start",width:"90%",gap:2, marginTop: 3, height:"40vh", padding: 5 }}>

{ role === "Student" &&
<>
        <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='p'>College: {user.college}</Typography>   
        <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='p'>Year of Study: {user.year_of_study}</Typography>
         </>
         }
        <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='p'>Date of Birth: {user.date_of_birth}</Typography>

        <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='p'>Age: { Math.floor((new Date() - new Date(user.date_of_birth).getTime()) / 3.15576e+10) }</Typography>

        <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}}  variant='p'>Address: {user.address}</Typography>

        <Typography sx={{fontSize: 20,fontFamily: '"Segoe UI"'}} variant='p'>Phone: {user.phone_number}</Typography>

  <Divider></Divider>

  </Paper>


  <Paper sx={{display: "flex", flexDirection: "column", flexWrap:"wrap", justifyContent:"center", alignItems:"center",width:"90%",gap:2, marginTop: 3, maxHeight:"90vh", padding: 3 }}>

  <Typography variant='h5'>Documents</Typography>

  { user.documents?.length > 0 &&

    <div style={{display: "flex", flexDirection: "row", flexWrap:"wrap", justifyContent:"center", alignItems:"center",width:"35vw",gap:4, marginTop: 3, maxHeight:"50vh", padding: 5 }}>
    { user?.documents?.map((doc, key) => (
      <iFrame style={{height: "20vh"}} key={key} src={`data:${doc?.type};base64,${Buffer.from(doc?.data).toString('base64')}`} />
    ))
  }
  
    </div>
}
</Paper>
</Paper>
 
        { role ==="Student" && 
        <FriendListContainer />

}
</div>
}
</>
  )
}
