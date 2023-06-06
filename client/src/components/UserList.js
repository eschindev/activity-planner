import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import Container from "@mui/material/Container";
import Fuse from "fuse.js";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import "../style/userList.css"

export default function UserList({ users }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const fuse = new Fuse(users, {
    keys: ["username", "firstName", "lastName", "email"],
    includeScore: true,
    threshold: 0.4,
  });

  const filterUsers = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : users;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (

    <Container maxWidth="sm">
      <div className="search-user">
        <input
          className="search-box"
          type="text"
          placeholder="Filter users..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {currentUsers.length > 0 ? (
        currentUsers.map((user) => {
          return <UserCard
          key={user._id}
          user={user}
        />
        
        })
      ) : (
        <div>No users found</div>
      )}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filterUsers.length / usersPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}
