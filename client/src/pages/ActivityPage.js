import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_ACTIVITY, QUERY_ME } from "../utils/queries";
import {
  JOIN_ACTIVITY,
  LEAVE_ACTIVITY,
  DELETE_ACTIVITY,
} from "../utils/mutations";
import InviteList from "../components/InviteList";
import UserList from "../components/UserList";
import { Grid, Typography, Button, Box } from "@mui/material";
import auth from "../utils/auth.js";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import InviteModal from "../components/InviteModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import "../style/activityPage.css"

const ActivityPage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  const token = auth.getProfile();
  const currentUserId = token.data._id;
  const [comments, setComments] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [participantIds, setParticipantIds] = useState([]);
  const [invites, setInvites] = useState([]);
  const [activity, setActivity] = useState({});
  const [ownerId, setOwnerId] = useState(undefined);

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: id },
  });
  const [getMyData] = useLazyQuery(QUERY_ME);

  const [leaveActivity] = useMutation(LEAVE_ACTIVITY);
  const [joinActivity] = useMutation(JOIN_ACTIVITY);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

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

  const handleDeleteActivity = async () => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await deleteActivity({
          variables: { id: id },
        });
        window.location.replace("/");
      } catch (error) {
        window.alert(error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setComments(data.getActivityById.comments);
      setParticipants(data.getActivityById.participants);
      setInvites(data.getActivityById.invites);
      setActivity(data.getActivityById);
      setOwnerId(data.getActivityById.owner._id);
    }
  }, [data]);

  useEffect(() => {
    if (participants) {
      setParticipantIds(participants.map((participant) => participant._id));
    }
  }, [participants]);

  if (loading || !activity) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <Typography variant="h2">{activity.name}</Typography>
            <Typography variant="h5">
              {dayjs(activity.date).format("MMMM D, YYYY")}
            </Typography>
            <Typography variant="h5">{activity.location}</Typography>
            <Typography variant="h6">{activity.description}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            {ownerId === currentUserId ? (
              <div >
                <InviteModal
                  activity={activity}
                  participantIds={participantIds}
                  invites={invites}
                  setInvites={setInvites}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: "20px" }}
                  onClick={() =>
                    window.location.replace(`/edit-activity/${id}`)
                  }
                >
                  Edit Activity
                </Button>
                <Button
                  variant="contained"
                  sx={{ margin: "20px", backgroundColor: "red" }}
                  onClick={() => handleDeleteActivity()}
                >
                  Delete Activity
                </Button>
              </div>
            ) : participantIds.includes(currentUserId) ? (
              <div>
                <InviteModal
                  activity={activity}
                  participantIds={participantIds}
                  invites={invites}
                  setInvites={setInvites}
                />
                <Button
                  variant="contained"
                  onClick={() => handleLeaveActivity()}
                  sx={{ margin: "20px" }}
                >
                  Leave Activity
                </Button>
              </div>
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
        <Typography className="header-style" variant="h4">Participants:</Typography>
        <UserList users={participants} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography className="header-style" variant="h4">Active Invites:</Typography>
        <InviteList invites={invites} />
        <br />
        <Box sx={{ justifyContent: "center" }}>
          <CommentForm
            activityId={id}
            comments={comments}
            setComments={setComments}
            sx={{ width: "100%" }}
          />
          <CommentList
            comments={comments}
            setComments={setComments}
            activityId={id}
            sx={{ width: "100%" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
export default ActivityPage;
