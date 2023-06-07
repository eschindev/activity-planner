import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_ACTIVITY } from "../utils/queries";
import InviteList from "../components/InviteList";
import UserList from "../components/UserList";
import { Grid, Typography } from "@mui/material";
import auth from "../utils/auth.js";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const ActivityPage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  const token = auth.getProfile();
  const currentUserId = token.data._id;
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: id },
  });

  useEffect(() => {
    if (data) {
      setComments(data.getActivityById.comments);
    }
  }, [data]);

  const activity = data?.getActivityById || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
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
      <Grid item xs={12}>
        <CommentForm
          activityId={id}
          comments={comments}
          setComments={setComments}
        />
        <CommentList comments={comments} activityId={id} />
      </Grid>
    </Grid>
  );
};
export default ActivityPage;
