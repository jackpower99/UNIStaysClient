import React from 'react'
import { Paper, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
import { getStudents } from '../../api/api';
import FriendList from '../friendList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getFriends, addFriend } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function FriendListContainer() {

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          
            width: "25vw",
            height: "85vh",
        
            marginTop: '2vh',
            gap: 10,

       },
       mobRoot:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
        width: "70vw",
        height: "85vh",
      
        marginTop: '2vh',
        gap: 10,
       },

       listStyles: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
           height: "70vh",
           width: "25vw",
           overflowY: 'scroll',
       },
       mobListStyles: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       height: "70vh",
       width: "90%",
       overflowY: 'scroll',
   }
   }));

  const classes = useStyles();

  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchInput, setSearchInput] = React.useState('')
  const [students, setStudents] = React.useState([])
  const [friends, setFriends] = React.useState([])
  const [friendToAdd, setFriendToAdd] = React.useState({})
  const [value, setValue] = React.useState('Users');
  const [email, setEmail ] = React.useState(JSON.parse(localStorage.getItem("userEmail")));

  const [token, setToken ] = React.useState(localStorage.getItem("token"))

  const navigate = useNavigate()

  const [runQueryFlag, setRunQueryFlag] = React.useState(false);

  const role = JSON.parse(localStorage.getItem("userRole"))

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useQuery(
    ["getStudents",{token: token}],
    getStudents,{
    onSuccess: (data)=>{
        setStudents(data)
    },
    onError: (err) =>{
      console.log(err);
    },
    refetchOnMount: role === "Student",
    enabled: role === "Student",
    cacheTime: 0
    }
  );

  useQuery(
    ["getFriends",{email: email, token: token}],
    getFriends,{
    onSuccess: (data)=>{
        setFriends(data.studentsData)
    },
    onError: (err) =>{
      console.log(err);
    },
    refetchOnMount: role === "Student",
    enabled: role === "Student",
    cacheTime: 0
    }
  );

  const action = (actionToDo, friend ) => {
      if(actionToDo ==="add") {
          setFriendToAdd(friend)
          setRunQueryFlag(true) 
      }
  }

  useQuery(
    ["addFriend", {email: email, friends_id: friendToAdd._id, token: token}],
    addFriend,{
    onSuccess: (data)=>{
        console.log(data)
        setRunQueryFlag(false)
        navigate(0)
    },
    onError: (err) =>{
      console.log(err);
      setRunQueryFlag(false)
    },
      enabled: runQueryFlag === true,
    }
    );

    const sortStudentsForListView = (stus) =>{


      if(role==="Student"){

      if(value==="Friends"){
        console.log(friends)
        return friends
      }
      else{

      var temp = []
      
        const studentsNotMe = stus
        .filter(student => student.student_email !== email)

        for(var i =0; i < studentsNotMe.length; i++){
          if(friends?.find(f => f._id === studentsNotMe[i]._id) === undefined){
            temp = [...temp, studentsNotMe[i]]
          }
          console.log(temp)
          return temp
        }
    }
  }else{
    return null;
  }
  }


  return (
      <Paper elevation={20} sx={{ backgroundColor: "#f2c8c2", borderRadius:"10px"}} className={isMobile? classes.mobRoot : classes.root}>
      <Tabs
      TabIndicatorProps={{style: {background:'white', color:"white"}}}
       value={value}
       onChange={handleChange}
       textColor="white"
       textColorPrimary="white"
       textColorSecondary="white"
       indicatorColor="secondary"
       aria-label="secondary tabs example"
     >
        <Tab value="Users" label="Users" />
        <Tab value="Friends" label="Friends" />

      </Tabs>
          <TextField id="outlined-basic" 
            label="Search" 
            sx={{ backgroundColor: "white"}}
            variant="outlined" 
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}/>

           <Paper  sx={{ backgroundColor: "#f2c8c2"}} elevation={0} className={isMobile? classes.mobListStyles : classes.listStyles}>
            <FriendList type={value} students={ sortStudentsForListView(students) } action={action} searchInput={searchInput}/>
            </Paper>

      </Paper>
  )
}
