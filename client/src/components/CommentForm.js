import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../utils/mutations";

import Auth from "../utils/auth";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const CommentForm = ({ activityId, comments, setComments }) => {
  const [commentText, setCommentText] = useState("");
  // const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          id: activityId,
          commentBody: commentText,
        },
      });

      setCommentText("");
      setComments([
        ...comments,
        {
          commentBody: commentText,
          user: Auth.getProfile().data,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
    }
  };
  const characterCount = commentText.length;
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        bgcolor: "white",
        padding: "20px",
        borderRadius: "5px",
        justifyContent: "center",
      }}
    >
      <div>
        <h4>Comments</h4>

        {Auth.loggedIn() ? (
          <>
            <p
              className={`m-0 ${
                characterCount === 280 || error ? "text-danger" : ""
              }`}
            >
              Character Count: {characterCount}/280
              {error && <span className="ml-2">{error.message}</span>}
            </p>
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div>
                <TextField
                  name="commentText"
                  placeholder="Add your comment..."
                  value={commentText}
                  className="form-input w-100"
                  style={{
                    lineHeight: "1.5",
                    resize: "vertical",
                    width: "60vw",
                  }}
                  onChange={handleChange}
                ></TextField>
              </div>

              <div className="col-12 col-lg-3">
                <Button
                  variant="contained"
                  sx={{ margin: "10px", whiteSpace: "nowrap" }}
                  type="submit"
                >
                  Add Comment
                </Button>
              </div>
            </form>
          </>
        ) : (
          <p>
            You need to be logged in to share your thoughts. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    </Box>
  );
};

export default CommentForm;
