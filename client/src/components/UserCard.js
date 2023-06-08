import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Grid, Typography, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_REQUEST } from "../utils/mutations";
import "../style/userCardStyle.css";

export default function UserCard({
  user,
  currentUserId,
  currentUserRequestSenderIds,
}) {
  const [requestSent, setRequestSent] = useState(false);
  const [createRequest] = useMutation(CREATE_REQUEST);

  const userFriendIds = user?.friends.map((friend) => friend._id);
  const userRequestSenderIds = user?.requests.map(
    (request) => request.sender._id
  );

  const sendFriendRequest = async () => {
    try {
      await createRequest({
        variables: { recipient: user._id },
      });
      setRequestSent(true);
    } catch (error) {
      window.alert(error);
    }
  };

  const mayRequest = !(
    userFriendIds.includes(currentUserId) ||
    userRequestSenderIds.includes(currentUserId) ||
    currentUserRequestSenderIds.includes(user._id) ||
    currentUserId === user._id ||
    requestSent
  );

  return (
    <div className="user-container">
      <motion.div
        className="user-content"
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item>
              <Link
                to={`/user/${user.username}`}
                style={{ textDecoration: "none" }}
              >
                <AccountBoxIcon
                  className="custom-icon"
                  style={{ fontSize: 60 }}
                />
              </Link>
            </Grid>
            <Grid item>
              <Link
                to={`/user/${user.username}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h5" component="div">
                  {user.username}
                </Typography>
              </Link>
              <Typography color="text.secondary">{user.fullName}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              {mayRequest ? (
                <Button variant="contained" onClick={sendFriendRequest}>
                  Add Friend
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </motion.div>
    </div>
  );
}
