import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { UPDATE_ACTIVITY } from "../utils/mutations";
import { QUERY_ACTIVITY } from "../utils/queries";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
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
import dayjs from "dayjs";

const EditActivityPage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: id },
  });

  const [formState, setFormState] = useState({
    name: "",
    date: dayjs(new Date()),
    location: "",
    description: "",
    private: true,
  });
  const [updateActivity] = useMutation(UPDATE_ACTIVITY);

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
      date: newValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      await updateActivity({
        variables: {
          id: id,
          input: formState,
        },
      });
      window.location.replace(`/activity/${id}`);
    } catch (e) {
      window.alert(e);
    }
  };

  useEffect(() => {
    if (data) {
      const date = dayjs(new Date(data.getActivityById.date));
      console.log(date);
      setFormState({
        name: data.getActivityById.name,
        date: date,
        location: data.getActivityById.location,
        description: data.getActivityById.description,
        private: data.getActivityById.private,
      });
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
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
            <DatePicker
              id="date"
              label="date"
              value={formState.date}
              onChange={handleDateChange}
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
              Update Activity!
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
export default EditActivityPage;
