import React from 'react'
import { Paper, Typography, Box, Grid, Divider, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
import { getStudents } from '../../api/api';
import FriendList from '../friendList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getFriends, addFriend } from '../../api/api';

export default function FriendListContainer() {

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //justifyContent: "center",
            width: "25vw",
            height: "85vh",
            // backgroundColor: "",
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
       }
   }));

  const classes = useStyles();


  const [searchInput, setSearchInput] = React.useState('')
  const [students, setStudents] = React.useState([])
  const [friends, setFriends] = React.useState([])
  const [friendToAdd, setFriendToAdd] = React.useState({})
  const [value, setValue] = React.useState('Users');
  const [email, setEmail ] = React.useState(JSON.parse(localStorage.getItem("userEmail")));
  const [userList, setUserList] = React.useState([])
  const [friendsReceivedFlag, setFriendsReceivedFlag] = React.useState(false)

  const [runQueryFlag, setRunQueryFlag] = React.useState(false);

  const role = JSON.parse(localStorage.getItem("userRole"))

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //sortStudentsForListView(students)
  };

  useQuery(
    "getStudents",
    getStudents,{
    onSuccess: (data)=>{
        setStudents(data)
    },
    onError: (err) =>{
      console.log(err);
    },
    refetchOnMount: "always"
    }
  );

  useQuery(
    ["getFriends", email ],
    getFriends,{
    onSuccess: (data)=>{
        setFriends(data.studentsData)
    },
    onError: (err) =>{
      console.log(err);
    },
    refetchOnMount: "always"
    }
  );

  const action = (actionToDo, friend ) => {
      if(actionToDo ==="add") {
          setFriendToAdd(friend)
          setRunQueryFlag(true) 
      }
  }

  useQuery(
    ["addFriend", {email: email, friends_id: friendToAdd._id}],
    addFriend,{
    onSuccess: (data)=>{
        console.log(data)
        setRunQueryFlag(false)
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
          if(friends.find(f => f._id === studentsNotMe[i]._id) === undefined){
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
      <Paper elevation={20} sx={{ backgroundColor: "#f2c8c2", borderRadius:"10px"}} className={classes.root}>
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

           <Paper  sx={{ backgroundColor: "#f2c8c2"}} elevation={0} className={classes.listStyles}>
            <FriendList type={value} students={ sortStudentsForListView(students) } action={action} searchInput={searchInput}/>
            </Paper>

      </Paper>
  )
}
