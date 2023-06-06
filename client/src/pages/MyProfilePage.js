import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ActivityList from "../components/ActivityList";
import UserList from "../components/UserList";
import InviteList from "../components/InviteList";
import RequestList from "../components/RequestList";

const MyProfilePage = ({ currentUserId }) => {
  //declare username to be, if they are logged in, get it from their profile, if they
  //are not logged in, then it's empty string
  if (!currentUserId) {
    window.location.replace("/login");
  }

  const { loading, data } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    return `Please log in`;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.getMyUser || {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">Welcome, {user.username}!</Typography>
        <Typography variant="h5">{user.fullName}</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Activities:</Typography>
        <ActivityList activities={user.activities} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Friends:</Typography>
        <UserList users={user.friends} currentUserId={currentUserId} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Activity Invites:</Typography>
        <InviteList invites={user.invites} currentUserId={currentUserId} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Friend Requests:</Typography>
        <RequestList requests={user.requests} currentUserId={currentUserId} />
      </Grid>
    </Grid>
  );
};
export default MyProfilePage;
