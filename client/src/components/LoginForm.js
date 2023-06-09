import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import textFieldStyles from "./TextFieldStyles";
import "../style/theme.css";

import Auth from "../utils/auth";

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
          padding: "40px",
          background: "rgba(255,255,255, 0.8)",
          boxSizing: "border-box",
          boxShadow: "0 15px 25px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LoginTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            sx={{
              "& label": {
                marginTop: "-10px",
              },
            }}
            style={textFieldStyles}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formState.email}
            onChange={handleChange}
          />
          <TextField
            sx={{
              "& label": {
                marginTop: "-10px",
              },
            }}
            style={textFieldStyles}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {data ? (
          <Typography variant="body1" mt={2}>
            Success! You may now head{" "}
            <RouterLink to="/" variant="body1">
              back to the homepage.
            </RouterLink>
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
};

export default LoginForm;
