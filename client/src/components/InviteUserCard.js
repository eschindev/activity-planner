import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Grid, Typography, Button } from "@mui/material";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_INVITE } from "../utils/mutations";
import { QUERY_ACTIVITY } from "../utils/queries";
import "../style/userCardStyle.css";
import auth from "../utils/auth.js";

export default function InviteUserCard({
  user,
  currentUser,
  invitable,
  setInvitable,
  invites,
  setInvites,
}) {
  const { id } = useParams();
  const [getActivity, { loading, data }] = useLazyQuery(QUERY_ACTIVITY);
  const [createInvite] = useMutation(CREATE_INVITE);

  const sendInvite = async () => {
    try {
      console.log("user._id", user._id);
      const { data } = await getActivity({ variables: { id: id } });
      const activity = data?.getActivityById;
      console.log("activity", activity);

      if (activity) {
        await createInvite({
          variables: { recipient: user._id, activity: id },
        });
        setInvitable(
          invitable.filter((invitableUser) => invitableUser._id !== user._id)
        );
        setInvites([
          ...invites,
          {
            sender: currentUser,
            recipient: user,
            activity: activity,
          },
        ]);
      }
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
            <Grid item xs={8}>
              <Link
                to={`/user/${user.username}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h5" component="div">
                  {user.username}
                </Typography>
              </Link>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {user.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={sendInvite}>
                Invite
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </motion.div>
    </div>
  );
}
