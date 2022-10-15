import React, { useReducer, useEffect } from "react";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { log } from "console";
import {
  useAccountMutation,
} from "../../api/account-mutation";
import {useNavigate} from 'react-router-dom';

interface IFormInput {
  email: string;
  firstName: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));


const schema = yup.object().shape({
  email: yup.string().required().email(),
  firstName: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
});


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { heading, submitButton } = useStyles();
  const [json, setJson] = useState<string>();
  const [createAccount] = useAccountMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: IFormInput) => {
    setJson(JSON.stringify(data));
    console.log("JSON.stringify(data)", JSON.stringify(data));
    await createAccount({
      variables: {
        username: data.firstName,
        password: data.password,
      },
    }).then(data => {
      console.log("data", data);
      navigate('/login')
    });
  };

  //   const Registration = async () => {
  //   try {
  //     await createAccount({
  //       variables: {
  //         username: "caokynhat",
  //         password: "12345689",
  //       },
  //     }).then(data => {
  //       console.log("data", data);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Sign Up Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("email")}
          variant="outlined"
          margin="normal"
          label="Email"
          error={!!errors.email?.message}
          fullWidth
          required
        />
        <TextField
          {...register("firstName")}
          variant="outlined"
          margin="normal"
          label="First Name"
          error={!!errors.firstName?.message}
          fullWidth
          required
        />
        <TextField
          {...register("password")}
          variant="outlined"
          margin="normal"
          label="Password"
          error={!!errors.password?.message}
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
