import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ActivityList from "../components/ActivityList";
import UserList from "../components/UserList";
import InviteList from "../components/InviteList";
import RequestList from "../components/RequestList";

const MyProfilePage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  const token = auth.getProfile();
  const currentUserId = token.data._id;

  const { loading, data } = useQuery(QUERY_ME);

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
        <UserList users={user.friends} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Activity Invites:</Typography>
        <InviteList invites={user.invites} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h4">Friend Requests:</Typography>
        <RequestList requests={user.requests} />
      </Grid>
    </Grid>
  );
};
export default MyProfilePage;
