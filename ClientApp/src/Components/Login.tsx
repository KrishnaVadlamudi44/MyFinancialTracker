import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserLogin, UserRegister } from '../Api/UserApi';
import { AppContextState, useAppContextState } from '../Context/AppContext';
import {
  IUserLoginRequest,
  IUserRegisterRequest,
} from '../Models/UserModels/User';
import ButtonInput from './InputComponents/ButtonInput';
import TextInput from './InputComponents/TextInput';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

interface ILoginInterface {
  loginOrRegister: 'login' | 'register';
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [localState, setLocalState] = useState<ILoginInterface>({
    loginOrRegister: 'login',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    loading: false,
  });
  const { appContextState, dispatch } = useAppContextState();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalState((prevState: ILoginInterface) => ({
      ...prevState!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLocalState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    if (localState.loginOrRegister === 'login') {
      var userInfo = await UserLogin(localState as IUserLoginRequest);
      if (userInfo.tokenString) {
        localStorage.setItem('token', userInfo.tokenString);
        dispatch({
          type: 'updateAppState',
          nextState: {
            ...appContextState,
            authenticated: true,
            userGuid: userInfo.userGuid,
          },
        });
      }
    } else {
      var userRegister = await UserRegister(localState as IUserRegisterRequest);
      if (userRegister.createdUserGuid) {
        setLocalState((prevState) => ({
          ...prevState,
          loginOrRegister: 'login',
        }));
      }
    }
    setLocalState((prevState) => ({
      ...prevState,
      loading: false,
    }));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {localState.loginOrRegister === 'register' && (
          <>
            <TextInput
              name='firstName'
              value={localState.firstName}
              onChange={handleChange}
              required={true}
              fullwidth={true}
              autoFocus={true}
              margin='normal'
            />
            <TextInput
              name='lastName'
              value={localState.lastName}
              onChange={handleChange}
              required={true}
              fullwidth={true}
              margin='normal'
            />
          </>
        )}
        <TextInput
          name='userName'
          value={localState.userName}
          onChange={handleChange}
          required={true}
          fullwidth={true}
          autoFocus={true}
          margin='normal'
        />
        <TextInput
          name='password'
          value={localState.password}
          onChange={handleChange}
          required={true}
          fullwidth={true}
          margin='normal'
          type='password'
        />
        {/* <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        /> */}
        <ButtonInput
          label={localState.loginOrRegister === 'login' ? 'Sign In' : 'Sign Up'}
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={handleLogin}
          fullWidth={true}
          loading={localState.loading}
        />
        <Grid container justify='flex-end'>
          {/* <Grid item xs>
            <Link href='#' variant='body2'>
              Forgot password?
            </Link>
          </Grid> */}
          <Grid item>
            <Link
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                setLocalState((prevState) => ({
                  ...prevState,
                  loginOrRegister:
                    prevState.loginOrRegister === 'login'
                      ? 'register'
                      : 'login',
                }));
              }}
              href='#'
              variant='body2'
            >
              {localState.loginOrRegister === 'login'
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign in'}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © KC_vadlamudi'}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Login;
