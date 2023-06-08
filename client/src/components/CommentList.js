import React from "react";
import Container from "@mui/material/Container";
import CommentCard from "./CommentCard";
import "../style/notFound.css"

export default function CommentList({ comments, activityId, setComments }) {
  return (
    <Container maxWidth="sm">
      {comments ? (
        comments.map((comment) => {
          return (
            <CommentCard
              key={comment._id || Math.random()}
              activityId={activityId}
              comments={comments}
              setComments={setComments}
              comment={comment}
            />
          );
        })
      ) : (
     <div className="not-found-container">
        <h1 className="text">No comments found</h1>
      </div>
      )}
    </Container>
  );
}
