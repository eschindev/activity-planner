import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Grid, Typography, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_REQUEST } from "../utils/mutations";
import "../style/userCardStyle.css";
import { create } from "@mui/material/styles/createTransitions";

export default function UserCard({ user, currentUserFriendIds }) {
  const [createRequest, { error }] = useMutation(CREATE_REQUEST);

  const sendFriendRequest = async () => {
    try {
      await createRequest({
        variables: { recipient: user._id },
      });
    } catch (error) {
      window.alert(error);
    }
  };

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
            <Grid item xs={4}>
              <Link to={`/user/${user.username}`}>
                <AccountBoxIcon
                  className="custom-icon"
                  style={{ fontSize: 60 }}
                />
              </Link>
            </Grid>
            <Grid item xs={8}>
              <Link to={`/user/${user.username}`}>
                <Typography variant="h5" component="div">
                  {user.username}
                </Typography>
              </Link>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {user.fullName}
              </Typography>
            </Grid>
            {!currentUserFriendIds.includes(user._id) ? (
              <Grid item xs={12}>
                <Button variant="contained" onClick={sendFriendRequest}>
                  Add Friend
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </CardContent>
      </motion.div>
    </div>
  );
}
