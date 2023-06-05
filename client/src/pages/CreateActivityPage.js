import { useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { CREATE_ACTIVITY } from "../utils/mutations";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const defaultTheme = createTheme();
const CreateActivityPage = ({ currentUserId }) => {
  if (!currentUserId) {
    window.location.replace("/login");
  }
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    private: true,
  });
  const [addActivity, { error, data }] = useMutation(CREATE_ACTIVITY);

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

    // try {
    const { data } = await addActivity({
      variables: { input: formState },
    });
    // } catch (e) {
    //   console.error(e);
    // }
  };

  if (!Auth.loggedIn()) {
    return `Please log in`;
  }

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Activity
            </Typography>
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name" //match model
                label="Activity Name"
                name="name" //match field in our form match model
                //   autoComplete="firstname"
                autoFocus
                value={formState.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                //   autoComplete="firstname"
                autoFocus
                value={formState.date}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                //   autoComplete=""
                autoFocus
                value={formState.location}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                //   autoComplete=""
                value={formState.description}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Private</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formState.private}
                  label="Private Event"
                  onChange={handleChange}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Activity!
              </Button>
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </Box>
            {data && (
              <Typography variant="body1" mt={2}>
                Success! You may now head{" "}
                <RouterLink to="/" variant="body1">
                  back to the homepage.
                </RouterLink>
              </Typography>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default CreateActivityPage;
