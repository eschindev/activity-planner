import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_ACTIVITY, QUERY_ME } from "../utils/queries";
import { JOIN_ACTIVITY, LEAVE_ACTIVITY } from "../utils/mutations";
import InviteList from "../components/InviteList";
import UserList from "../components/UserList";
import { Grid, Typography, Button } from "@mui/material";
import auth from "../utils/auth.js";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const ActivityPage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  const token = auth.getProfile();
  const currentUser = token.data;
  const currentUserId = token.data._id;
  const [comments, setComments] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [participantIds, setParticipantIds] = useState([]);

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: id },
  });
  const [getMyData, { myLoading, myData }] = useLazyQuery(QUERY_ME);

  const [leaveActivity, { leaveError }] = useMutation(LEAVE_ACTIVITY);
  const [joinActivity, { joinError }] = useMutation(JOIN_ACTIVITY);

  const handleLeaveActivity = async () => {
    try {
      await leaveActivity({
        variables: { id: id },
      });
      setParticipants(
        participants.filter((participant) => participant._id !== currentUserId)
      );
    } catch (error) {
      window.alert(error);
    }
  };

  const handleJoinActivity = async () => {
    try {
      await joinActivity({
        variables: { id: id },
      });
      const myUser = await getMyData();
      setParticipants([...participants, myUser.data.getMyUser]);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    if (data) {
      setComments(data.getActivityById.comments);
      setParticipants(data.getActivityById.participants);
    }
  }, [data]);

  useEffect(() => {
    if (participants) {
      setParticipantIds(participants.map((participant) => participant._id));
    }
  }, [participants]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const activity = data?.getActivityById || {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <Typography variant="h2">{activity.name}</Typography>
            <Typography variant="h5">{activity.date}</Typography>
            <Typography variant="h5">{activity.location}</Typography>
            <Typography variant="h6">{activity.description}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            {activity.owner._id === currentUserId ? (
              <div>
                <Button variant="contained" sx={{ margin: "20px" }}>
                  Delete Activity
                </Button>
                <Button variant="contained" sx={{ margin: "20px" }}>
                  Edit Activity
                </Button>
              </div>
            ) : participantIds.includes(currentUserId) ? (
              <Button
                variant="contained"
                onClick={() => handleLeaveActivity()}
                sx={{ margin: "20px" }}
              >
                Leave Activity
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleJoinActivity()}
                sx={{ margin: "20px" }}
              >
                Join Activity
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Participants:</Typography>
        <UserList users={participants} />
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
