import React, { useState } from "react";
import InviteUserCard from "./InviteUserCard";
import Container from "@mui/material/Container";
import Fuse from "fuse.js";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import "../style/userList.css";
import auth from "../utils/auth.js";

export default function InviteUserList({
  invitable,
  activity,
  setInvitable,
  invites,
  setInvites,
  currentUser,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const fuse = new Fuse(invitable, {
    keys: ["username", "firstName", "lastName", "email"],
    includeScore: true,
    threshold: 0.4,
  });

  const filterUsers = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : invitable;

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
          return (
            <InviteUserCard
              key={user._id}
              user={user}
              currentUser={currentUser}
              invitable={invitable}
              setInvitable={setInvitable}
              activity={activity}
              invites={invites}
              setInvites={setInvites}
            />
          );
        })
      ) : (
        <div>No users found</div>
      )}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          variant="outlined"
          color="secondary"
          count={Math.ceil(filterUsers.length / usersPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}
