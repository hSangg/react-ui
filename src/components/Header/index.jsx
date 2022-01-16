import {Avatar, Box} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Close} from '@material-ui/icons';
import AssistantRoundedIcon from '@material-ui/icons/AssistantRounded';
import Login from 'features/Auth/Login';
import Register from 'features/Auth/Register';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

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
    fontWeight: '600',
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
}));

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const isLogin = !!useSelector((x) => x.user.current.id);
  console.log(isLogin);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AssistantRoundedIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              <Button className={classes.text}> H_sang</Button>
            </Link>
          </Typography>
          {isLogin && (
            <>
              <IconButton>
                <Avatar className={classes.iconUserBG}>
                  <AccountCircleTwoToneIcon fontSize="large" />
                </Avatar>
              </IconButton>
            </>
          )}
          {!isLogin && (
            <>
              <Button className={classes.button} variant="contained" onClick={handleClickOpen}>
                Resignter
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick="true"
        disableEscapeKeyDown="true"
        maxWidth="md"
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
                  <Typography className={classes.modeActive}>Register here</Typography>
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
                  <Typography className={classes.modeActive}>Login here</Typography>
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
