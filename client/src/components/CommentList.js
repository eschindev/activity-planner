import React from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import Container from "@mui/material/Container";

export default function CommentList({ users }) {
  console.log(users);
  return (
    <Container maxWidth="sm">
      {users ? (
        comments.map((user) => {
          return <CommentCard key={user._id} user={user} />;
        })
      ) : (
        <div>No users found</div>
      )}
    </Container>
  );
}
