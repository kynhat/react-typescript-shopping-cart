import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Action } from "../../store/actions";
import { ActionType } from "../../store/action-types";
import loginReducer from "../../store/reducer/loginReducer";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import {
  useAccountMutation,
  useLoginAccountMutation,
  LOGIN_ACCOUNT,
} from "../../api/account-mutation";
import { PRODUCT } from "../../api/product-mutation";
import { useQuery } from "@apollo/client";
import {useNavigate} from 'react-router-dom';

import {
  CreateCheckoutMutation,
} from "../../api/checkout-mutation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#3f51b5",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

//state type

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const navigate = useNavigate();
	const [loginUser] = useLoginAccountMutation();

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: ActionType.SETISBUTTONDISABLED,
        payload: false,
      });
    } else {
      dispatch({
        type: ActionType.SETISBUTTONDISABLED,
        payload: true,
      });
    }
  }, [state.username, state.password]);


  const handleLogin = async () => {
    let isCheckLogin = false;

    await loginUser({
      variables: {
        username: state.username,
        password: state.password,
      },
    }).then(data => {
      isCheckLogin = data?.data?.loginUser ?? false;
      // save isCheckLogin in localStorage check if login or logout or not registered
      localStorage.setItem("isCheckLogin",isCheckLogin.toString());
    });

    if (isCheckLogin) {
      dispatch({
        type: ActionType.LOGINSUCCESS,
        payload: "Login Successfully",
      });
      navigate('/')
    } else {
      dispatch({
        type: ActionType.LOGINFAILED,
        payload: "Incorrect username or password",
      });
    }
  };

  const handleRegistration = async () => {
    navigate('/signUp')
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    dispatch({
      type: ActionType.SETUSERNAME,
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    dispatch({
      type: ActionType.SETPASSWORD,
      payload: event.target.value,
    });
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.loginBtn}
            onClick={handleRegistration}
          >
            Register
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Login;
