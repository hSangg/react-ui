import {Avatar, Box, ListItemText, Menu, MenuItem} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Close} from '@material-ui/icons';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import AssistantRoundedIcon from '@material-ui/icons/AssistantRounded';
import Login from 'features/Auth/Login';
import Register from 'features/Auth/Register';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {ListItemIcon, Divider} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useDispatch} from 'react-redux';
import {logout} from 'features/Auth/userSlice';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.5rem',
  },
  background: {
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: '700',
    padding: '0',
  },
  button: {
    backgroundColor: theme.palette.primary.light,
  },
  iconButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
  modeButton: {
    color: theme.palette.primary.light,
    margin: theme.spacing(0, 0, 1, 2),
    cursor: 'pointer',
  },
  modeActive: {
    fontWeight: '600',
    color: theme.palette.primary.dark,
    display: 'inline',
  },
  iconUserBG: {
    backgroundColor: theme.palette.primary.light,
  },
  logo: {
    color: '#7e57c2',
    fontWeight: '600',
  },
  navbar: {
    '& a': {
      textDecoration: 'none',
      color: '#fff',
      margin: theme.spacing(2),
    },
  },
}));

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const dispatch = useDispatch();

  const isLogin = !!useSelector((x) => x.user.current.id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUser();
  };

  const classes = useStyles();

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #648dae',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <AssistantRoundedIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              <Button className={classes.text}>
                {' '}
                H_
                <Typography className={classes.logo} variant="h6">
                  sang
                </Typography>
              </Button>
            </Link>
          </Typography>
          <Typography className={classes.navbar}>
            <NavLink to="./products">Products</NavLink>
          </Typography>
          {isLogin && (
            <>
              <IconButton onClick={handleClickAvatar}>
                <Avatar className={classes.iconUserBG}>
                  <AccountCircleTwoToneIcon fontSize="large" />
                </Avatar>
              </IconButton>
            </>
          )}
          {!isLogin && (
            <>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleClickOpen}>
                Resignter
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Login Register */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick="true"
        disableEscapeKeyDown="true"
        maxWidth={mode === MODE.LOGIN ? 'sm' : 'md'}
        fullWidth>
        <DialogContent>
          <IconButton onClick={handleClose} className={classes.iconButton}>
            <Close />
          </IconButton>

          {mode === MODE.LOGIN && (
            <>
              <Login onClose={handleClose} />
              <Box onClick={() => setMode(MODE.REGISTER)}>
                <Typography className={classes.modeButton}>
                  Don't have an account ?{' '}
                  <Typography className={classes.modeActive}>
                    Register here
                  </Typography>
                </Typography>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register onClose={handleClose} />
              <Box onClick={() => setMode(MODE.LOGIN)}>
                <Typography className={classes.modeButton}>
                  Have an account ?{' '}
                  <Typography className={classes.modeActive}>
                    Login here
                  </Typography>
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Menu */}

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseUser}>
        <StyledMenuItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
