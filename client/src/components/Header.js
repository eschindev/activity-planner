import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

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

export default function Header({ searchTerm, setSearchTerm }) {
  const searchTypeFromUrl = window.location.pathname.split("/")[2];
  let searchTermFromUrl = window.location.pathname.split("/")[3];
  if (searchTermFromUrl) {
    searchTermFromUrl = decodeURIComponent(searchTermFromUrl);
  }
  console.log(searchTypeFromUrl, searchTermFromUrl);
  const [searchTemp, setSearchTemp] = useState(searchTermFromUrl || "");
  const [searchType, setSearchType] = useState(searchTypeFromUrl || "users");

  const handleSearch = (event) => {
    if (searchTemp !== "" && event.key === "Enter") {
      console.log("handleSearch executed");
      setSearchTerm(searchTemp);
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      window.location.replace(`/search/${searchType}/${searchTerm}`);
    }
  }, [searchTerm]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
