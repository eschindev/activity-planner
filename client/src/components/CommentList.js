import React from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import CommentCard from "./CommentForm";

export default function CommentList({ comments, activityId }) {
  console.log(comments);

  return (
    <Container maxWidth="sm">
      {comments ? (
        comments.map((comment) => {
          return <CommentCard username={'user'} id={'001'} activityId={activityId} commentBody={comment.commentBody} timestamp={'202020'} />;
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
