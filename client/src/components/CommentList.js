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
        <h1 className="text">No activity found</h1>
        <p>Sorry, the activity you are looking for does not exist.</p>
      </div>
      )}
    </Container>
  );
}
//'user' will become {comment.username}
//001 will = {comment.id}
//007 = {comment.activityId}
//comment
