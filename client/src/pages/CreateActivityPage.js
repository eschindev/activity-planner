import { useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
import { CREATE_ACTIVITY } from "../utils/mutations";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import auth from "../utils/auth.js";
import textFieldStyles from "../components/TextFieldStyles";
import EditCalendarTwoToneIcon from "@mui/icons-material/EditCalendarTwoTone";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const CreateActivityPage = () => {
  if (!auth.loggedIn()) {
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

  const handleDateChange = (newValue) => {
    setFormState({
      ...formState,
      "date": newValue
    });
  }

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
            <EditCalendarTwoToneIcon />
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
              sx={{
                "& label": {
                  marginTop: "-10px", // Adjust the value to position the label higher
                },
              }}
              style={textFieldStyles}
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
            <DatePicker id="date" label="date" value={formState.date} onChange={handleDateChange}/>
            {/* <TextField
              sx={{
                "& label": {
                  marginTop: "-10px", // Adjust the value to position the label higher
                },
              }}
              style={textFieldStyles}
              margin="normal"
              required
              fullWidth
              id="date"
              label="Date"
              name="date"
              autoFocus
              value={formState.date}
              onChange={handleChange}
            /> */}
            <TextField
              sx={{
                "& label": {
                  marginTop: "-10px", // Adjust the value to position the label higher
                },
              }}
              style={textFieldStyles}
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
              sx={{
                "& label": {
                  marginTop: "-10px", // Adjust the value to position the label higher
                },
              }}
              style={textFieldStyles}
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
            <FormControl sx={{ mt: 1.5 }} fullWidth>
              <InputLabel sx={{ mt: -1 }} id="demo-simple-select-label">
                Private
              </InputLabel>
              <Select
                style={textFieldStyles}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formState.private}
                label="Private Event"
                name="private"
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
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
    </div>
  );
};
export default CreateActivityPage;
