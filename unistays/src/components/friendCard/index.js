import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Buffer } from 'buffer';
import { IconButton, Box, Paper } from "@mui/material";
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import temp from '../../resource/images/landingJPG.jpg'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: { 
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "20vw", 
    height: "23vh", 
    marginBottom: 10},
    mobCard:{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      width: "90%", 
      height: "23vh", 
      marginBottom: 10
    },
  media: { height: 200 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function StudentCard({ student, action, type }) {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card className={isMobile? classes.mobCard : classes.card}>
         <Box
                component="img"
                sx={{
                  height: "7vh",
                  width: '25%',
                  marginTop: 1,
                  alignSelf: 'center',
                  border: '1px solid white',
                  borderRadius: "10px",
                  overflow: 'none',
                }}
                src={student.profile_picture?.data !== undefined  ? `data:${student.profile_picture.type};base64,${Buffer.from(student.profile_picture.data).toString('base64')}` : temp}
                alt={student.profile_picture?.name}
              />
      <CardContent>
       
        <Paper sx={{display: "flex", flexDirection: "column", alignItems: "flex-start",  backgroundColor: "#f2c8c2", color:"white",   justifyContent: 'flex-start',padding:1}}>
        <Grid container>
          <Grid item xs={8}>
      
      
          <Typography variant="h7" component="p">
             Name: {student.fname} {student.lname}
            </Typography>
     
      
          <Typography variant="h7" component="p">
              College: {student.college}
              </Typography>
         
     
              <Typography variant="h7" component="p">
              Year of Study: {student.year_of_study}
            </Typography>
  
  </Grid>
      
      { type === "Users" && 

<Grid item xs={4}>
  <div style={{display: "flex", flexDirection: "column",alignItems: "flex-end",justifyContent: 'center'}}>
          <CardActions disableSpacing>
      <IconButton  aria-label="add to favorites" onClick={ (() => {action("add",student)})}>
        <PersonAddTwoToneIcon color="black" fontSize="large" />
    </IconButton>
          </CardActions>
          </div>
          </Grid>
      
}
</Grid>
</Paper>
          </CardContent>
     </Card>
  );
}