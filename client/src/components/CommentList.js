import React from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import CommentCard from "./CommentForm";

export default function CommentList({ comments }) {
  console.log(comments);

  return (
    <Container maxWidth="sm">
      {/* {comments ? (
        comments.map((comment) => {
          return <CommentCard key={comment._id} user={comment.username} />;
        })
      ) : (
        <div>No comments found</div>
      )} */}
    </Container>
  );
}
