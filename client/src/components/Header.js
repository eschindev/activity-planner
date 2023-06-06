import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
const logo = process.env.PUBLIC_URL + "/actio_logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ currentUserId }) {
  let searchTypeFromUrl = "users";
  let searchTermFromUrl = "";
  if (window.location.pathname.split("/")[1] === "search") {
    searchTypeFromUrl = window.location.pathname.split("/")[2];
    searchTermFromUrl = window.location.pathname.split("/")[3];
    if (searchTermFromUrl) {
      searchTermFromUrl = decodeURIComponent(searchTermFromUrl);
    }
  }
  const [searchTemp, setSearchTemp] = useState(searchTermFromUrl);
  const [searchType, setSearchType] = useState(searchTypeFromUrl);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    if (
      searchTemp !== "" &&
      (event.key === "Enter" || event.type === "click")
    ) {
      setSearchTerm(searchTemp);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    window.location.replace("/login");
  };

  useEffect(() => {
    if (searchTerm !== "") {
      window.location.replace(`/search/${searchType}/${searchTerm}`);
    }
  }, [searchTerm]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "teal" }}>
        <Toolbar>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{ height: "50px", borderRadius: "50%" }}
            />
          </Link>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              marginLeft: "1%",
            }}
          >
            Actio
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTemp ? searchTemp : ""}
              onChange={(e) => setSearchTemp(e.target.value)}
              onKeyUp={handleSearch}
            />
          </Search>
          <Select
            onChange={(e) => setSearchType(e.target.value)}
            value={searchType}
            sx={{
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
          >
            <MenuItem value={"users"}>Users</MenuItem>
            <MenuItem value={"activities"}>Activities</MenuItem>
          </Select>
          <Button variant="outlined" color="inherit" onClick={handleSearch}>
            Search
          </Button>
          {currentUserId ? (
            <Button
              variant="text"
              color="inherit"
              onClick={handleLogout}
              style={{ marginLeft: "2%" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="text"
              color="inherit"
              style={{ marginLeft: "2%" }}
              onClick={handleLogout}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
