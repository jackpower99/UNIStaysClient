import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import HouseIcon from '@mui/icons-material/House';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { makeStyles } from '@material-ui/core';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function SideBarMenu(props) {

const { menuItems } = props;
const { menuItemSelected } = props;

const [ drawerWidth, setDrawerWidth ] = React.useState("15vw");

const getIcon = (text) => { 
    console.log(text);
    switch(text){
        case 'My Properties':
            return <HouseIcon />;
        case 'Advertise': 
            return <LoyaltyIcon />;
        case 'Social': 
            return <SupervisorAccountIcon />;
        default:
            return <HouseIcon />;
    }
 }

 const useStyles = makeStyles(theme => ({
     root: {
    '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation0.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiDrawer-paperAnchorDockedLeft.css-12i7wg6-MuiPaper-root-MuiDrawer-paper' : {
        //top: "6.6vh",
        marginTop: "65px"

    }},
    isMob: {
        '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation0.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiDrawer-paperAnchorDockedLeft.css-12i7wg6-MuiPaper-root-MuiDrawer-paper' : {
         //top: "10.6vh",
         marginTop: "80px",
         maxWidth: "50px",
         minWidth: "50px"

    }}
}));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
      if(isMobile){
          setDrawerWidth("9vw");
      }
  }, [isMobile])

  const classes = useStyles();

  return (
    
    <Box className={ isMobile === false ? classes.root : classes.isMob}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: -1,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'content-box' },
        }}
      >
        <Box>
          <List>
            {menuItems.map((text, index) => (
              <ListItem button key={index}
                onClick={ () => menuItemSelected(text)}
              >
                <ListItemIcon>
                  {
                      getIcon(text)
                  }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      </Box>
      
  );
}
