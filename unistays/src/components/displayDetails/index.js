import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getLandlordDetails } from '../../api/api';
import { Paper, Typography, Box, Grid, Divider } from '@mui/material';
import { Buffer } from 'buffer';
import {DropzoneDialog} from 'material-ui-dropzone'
import { AttachFile, Delet } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core';

import temp from '../../resource/images/landingJPG.jpg'


export default function DisplayDetails( { role, user } ) {

  const [attachFilesFlag, setAttachFilesFlag] = React.useState(false);
  const [userImage, setUserImages] = React.useState([]);
  const [objURL, setObjURL] = React.useState("")
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleAttachFiles = e => {
    e.preventDefault();
    setAttachFilesFlag(true);
  }

  const clearFiles = e =>{
    e.preventDefault();
    setUserImages({});
  }

  const handleSave = (f) => {
    //Saving files to state for further use and closing Modal
    setUserImages(f);
    setObjURL(URL.createObjectURL(f[0]))
    setAttachFilesFlag(false);
    };

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: "10vh",
      gap: 10,
      // marginLeft: "12vw",
      backgroundColor: theme.palette.common.black,
      height: "100vh",
      width: "45vw",
      }
  }));

  const classes = useStyles();

  return (

    <Paper className={classes.root}>
      <Box
                component="img"
                sx={{
                  height: "25vh",
                  width: '20vw',
                  marginTop: 3,
                  alignSelf: 'flex-start',
                  marginLeft: "20px",
                  border: '1px solid black',
                //   marginRight: "auto",
                  //maxWidth: "40vw",
                  overflow: 'none',
                  // width: '100%',
                }}
                src={ user.profile_image  ? `data:${user.profile_image?.type};base64,${Buffer.from(user.profile_image?.data).toString('base64')}` : userImage[0] ? objURL: temp}
                alt={user.profile_image?.name}
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4'>Name: {user.fname} {user.lname}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4'>Address: {user.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h4'>Date of Birth: {user.date_of_birth}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h4'>Age: { Math.floor((new Date() - new Date(user.date_of_birth).getTime()) / 3.15576e+10) }</Typography>
          </Grid>
      <Divider></Divider>
      <Grid item xs={12}>
      <Typography variant='h4'>Documents</Typography>
      </Grid>
        <Grid item xs={12}>
        <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap'}}>
        { user?.documents?.map((doc, key) => (
          <iFrame style={{height: "30vh", marginRight: 10}} key={key} src={`data:${doc.type};base64,${Buffer.from(doc.data).toString('base64')}`} />
        ))
      }
        </div>
        </Grid>
      </Grid>
            </Paper>
  )
}
// //       keys.map((key, index) =>(
// // <div key={index} style={{marginLeft: "10vw"}}>{(key +  values[index])}</div>
//       ))