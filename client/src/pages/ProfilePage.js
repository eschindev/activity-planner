import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { Link, useParams } from "react-router-dom";
import ActivityList from "../components/ActivityList";
import UserList from "../components/UserList";
import { Grid, Typography } from "@mui/material";

const ProfilePage = ({ currentUserId }) => {
  if (!currentUserId) {
    window.location.replace("/login");
  }
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { id: userId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  const user = data?.getUserById || {};
  console.log(user);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">{user.username}</Typography>
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
    </Grid>
  );
};

export default ProfilePage;
