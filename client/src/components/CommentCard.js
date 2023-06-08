import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../utils/mutations";
import "../style/commentCard.css";
import auth from "../utils/auth";

const CommentCard = ({ activityId, comment, comments, setComments }) => {
  //query that gets wrapped up in function we can call
  const currentUserId = auth.getProfile().data._id;
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const handleDeleteButton = async () => {
    await deleteComment({
      variables: {
        id: activityId, //please define this
        commentId: comment._id,
      },
    });
    setComments(comments.filter((c) => c._id !== comment._id));
  };

  return (
    <Card
      sx={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255, 0.8)",
        boxSizing: "border-box",
        boxShadow: "0 15px 25px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        height: "auto",
        width: "auto",
      }}
    >
      <CardContent className="comment-content">
        <Typography className="comment-typo" variant="h5" component="div">
          <Link to={`/user/${comment.user.username}`}>
            {comment.user.username}
          </Link>
        </Typography>
        <p className="comment-date">
          {" "}
          {dayjs(comment.timestamp).format("M/D/YY, h:mm A")}
        </p>
        <p className="comment-description">{comment.commentBody}</p>
        {currentUserId === comment.user._id ? (
          <Button onClick={handleDeleteButton}>Delete</Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
