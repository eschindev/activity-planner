import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_USER } from "../utils/mutations";
import auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";
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

  const [deleteUser, { error }] = useMutation(DELETE_USER);

  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.getMyUser || {};

  const createActivity = () => {
    window.location.replace("/create-activity");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser({
          variables: { id: currentUserId },
        });
        auth.logout();
        window.location.replace("/login");
      } catch (error) {
        window.alert(error);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <Typography variant="h2">{user.username}</Typography>
            <Typography variant="h5">{user.fullName}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              onClick={createActivity}
              sx={{ margin: "20px" }}
            >
              Create Activity
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteAccount}
              sx={{ margin: "20px", backgroundColor: "red" }}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
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
