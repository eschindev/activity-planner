import React from "react";
import { Link } from "react-router-dom";
import RequestCard from "./RequestCard";
import Container from "@mui/material/Container";

export default function RequestList({ users }) {
  console.log(users);
  return (
    <Container maxWidth="sm">
      {users ? (
        users.map((user) => {
          return <RequestCard key={user._id} user={user} />;
        })
      ) : (
        <div>No users found</div>
      )}
    </Container>
  );
}