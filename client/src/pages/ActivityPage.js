import React from "react";

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_ACTIVITY } from "../utils/queries";
import InviteList from "../components/InviteList";
import UserList from "../components/UserList";
import { Grid, Typography } from "@mui/material";
import auth from "../utils/auth.js";

const ActivityPage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  const token = auth.getProfile();
  const currentUserId = token.data._id;

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: id },
  });

  const activity = data?.getActivityById || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">{activity.name}</Typography>
        <Typography variant="h5">{activity.date}</Typography>
        <Typography variant="h5">{activity.location}</Typography>
        <Typography variant="h6">{activity.description}</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Participants:</Typography>
        <UserList users={activity.participants} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Active Invites:</Typography>
        <InviteList invites={activity.invites} />
      </Grid>
    </Grid>
  );
};
export default ActivityPage;
