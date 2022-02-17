import * as React from "react";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import logo from "../../resource/images/mainLogo.png";
import { login } from "../../api/api";
import {useQuery} from "react-query";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { red } from "@material-ui/core/colors";

import { useLocation } from "react-router-dom";

import { useAuth } from "../../utils/auth";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Login(props) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginFlag, setLoginFlag] = React.useState(false);
    const [fail, setFail] = React.useState(false);

    const auth = useAuth()

    const navigate = useNavigate();

    const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(2),
      
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
          },
          '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
            marginLeft: "250px",
            backgroundColor: "#FE7E6D"
          },
          '& h6': {
            color: red
          }
        }
      }));

      const classes = useStyles();

      useQuery(
        ["login", { email: email, password: password}],
        login,{
        onSuccess: (data)=>{
            console.log(data)
            setLoginFlag(false)
            if(!data.token){
              console.log("No token received");
            }
            else{
              console.log(data.user)
              localStorage.setItem("token", data.token)
              auth.login(data.user)
              navigate("/profile")
            }
        },
        onError: (err) =>{
            console.log(err);
            setFail(true);
        },
          enabled: loginFlag === true,
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
        console.log(email, password);
        loginUser();
      };

    const loginUser = async () =>{
        if(password.length>6 && email.length>6 && email.includes("@") && email.includes(".")){
            console.log("Logging In");
            setLoginFlag(true);
        }
        else {
            console.log("Unable to Login");
            setFail(true);
        }
    };

return (
    <>
   <form className={classes.root} onSubmit={handleSubmit}>
   <img src={logo} alt="logo"></img>
   <Typography variant="h6" mb={3} 
   sx={{
       color: "common.black",
       letterSpacing: 2,
       fontWeight: 'light',
       fontStyle: 'oblique',
       fontFamily: 'sans-serif',
       textAlign: 'center'
    }}
   >
   Welcome Back!
   </Typography>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
          <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
        <Snackbar open={fail} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Oops! Unable to Login! Check your details and try again..
        </Alert>
        </Snackbar>
    </>
)
}
