import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, makeStyles } from '@material-ui/core';
import { height } from "@mui/system";
import { Box } from "@mui/material";
import { CardActions } from "@mui/material";
//import { Link } from "@mui/material";
import {Link} from "react-router-dom";

export default function UserRoleCard(props){

    const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(2),
          margin: theme.spacing(4),
        }
    })
    );

const classes = useStyles();

return (
    <>

    <Box className={classes.root} >
      <Card sx={{
          width: "55%",
          height: "250px",
          textAlign: "center",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: "100px",
          bgcolor: "#F0F0F0",
          }}>
   
      <CardContent>
          <Link to = "/register" state={{selectedRole: props.role}}>
        <Typography sx={{
        fontSize: "4.5vmin",
       color: "#FE7E6D",
       letterSpacing: 2,
       fontWeight: 'light',
       fontStyle: 'oblique',
       fontFamily: 'sans-serif',
       textAlign: 'center'
    }}>
          Click here to register as a {props.role}
        </Typography>
        </Link>
        </CardContent>
     
        </Card>
     </Box>
    </>
)
}