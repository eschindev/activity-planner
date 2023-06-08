import React, { useState } from "react";
import UserCard from "./UserCard";
import Container from "@mui/material/Container";
import Fuse from "fuse.js";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import "../style/userList.css";
import auth from "../utils/auth.js";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import "../style/activityList.css";

export default function UserList({ users }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { data } = useQuery(QUERY_ME);
  let currentUserRequestSenderIds = [];
  if (data) {
    currentUserRequestSenderIds = data.getMyUser.requests.map(
      (request) => request.sender._id
    );
  }

  const token = auth.getProfile();
  const currentUserId = token.data._id;

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
          return (
            <UserCard
              key={user._id}
              user={user}
              currentUserId={currentUserId}
              currentUserRequestSenderIds={currentUserRequestSenderIds}
            />
          );
        })
      ) : (
        <div className="not-found-container">
          <h1 className="text">No users found</h1>
        </div>
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
