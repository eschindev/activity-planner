import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';


const defaultTheme = createTheme();

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, data }] = useMutation(CREATE_USER);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {

      const { data } = await addUser({
        variables: {input: formState },

      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeProvider 
    theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '400px',
            padding: '40px',
            background: 'rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
            boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
         
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
            //   autoComplete="firstname"
              autoFocus
              value={formState.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
            //   autoComplete="firstname"
              autoFocus
              value={formState.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              type="text"
              id="firstName"
              autoComplete="given-name"
              value={formState.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="text"
              id="lastName"
              autoComplete="family-name"
              value={formState.lastName}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formState.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleChange}
            />
            <TextField
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
              Submit
            </Button>
            <Grid container>
              <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                  {"Back to Sign In"}
                </Link>
              </Grid>
            </Grid>
            
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </Box>
          {data && (
            <Typography variant="body1" mt={2}>
              Success! You may now head{' '}
              <RouterLink to="/" variant="body1">
                back to the homepage.
              </RouterLink>
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
