import React from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import CommentCard from "./CommentCard";

export default function CommentList({ comments, activityId }) {
  return (
    <Container maxWidth="sm">
      {comments ? (
        comments.map((comment) => {
          return (
            <CommentCard
              username={comment.user.username}
              key={comment._id || comments.length}
              activityId={activityId}
              commentBody={comment.commentBody}
              timestamp={comment.timestamp}
            />
          );
        })
      ) : (
        <div>No comments found</div>
      )}
    </Container>
  );
}
//'user' will become {comment.username}
//001 will = {comment.id}
//007 = {comment.activityId}
//comment
