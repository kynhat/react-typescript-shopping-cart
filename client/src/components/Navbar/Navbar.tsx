
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
	Box,
	Chip,
	Select,
	MenuItem,
	FormControl
	// InputLabel
} from '@material-ui/core'
import { useContext, useState, ChangeEvent, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
 root: {
   flexGrow: 1,
   marginBottom: 20

 },
 menuButton: {
   marginRight: theme.spacing(2),
 },
 title: {
   flexGrow: 1,
 },
}));


const Navbar = () => {
	const classes = useStyles();
  const navigate = useNavigate();
  const isCheckLogin = localStorage.getItem("isCheckLogin");

  const handleClick = ()=> {
    navigate('/login')
    localStorage.setItem("isCheckLogin", 'false');
  }
	return (
  <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          
          { isCheckLogin === "true" &&
            <Button color="inherit" onClick={handleClick}>Logout</Button>
          }

          { isCheckLogin === "false" &&
            <Button color="inherit" onClick={handleClick}>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
	)
}

export default Navbar
