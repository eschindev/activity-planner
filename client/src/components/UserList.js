import React from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import Container from "@mui/material/Container";

export default function UserList({ users }) {
  console.log(users);
  return (
    <Container maxWidth="sm">
      {users ? (
        users.map((user) => {
          return <UserCard key={user._id} user={user} />;
        })
      ) : (
        <div>No users found</div>
      )}
    </Container>
  );
}
//a search box using fuzzy search