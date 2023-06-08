import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_USER } from "../utils/mutations";
import auth from "../utils/auth";
import { Grid, Typography, Button } from "@mui/material";
import ActivityList from "../components/ActivityList";
import UserList from "../components/UserList";
import InviteList from "../components/InviteList";
import RequestList from "../components/RequestList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "../style/myProfile.css";

const MyProfilePage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  const token = auth.getProfile();
  const currentUserId = token.data._id;

  const [deleteUser] = useMutation(DELETE_USER);

  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
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
          <Grid className="header-container" item xs={12} md={9}>
            <AccountCircleIcon
              className="account-circle-icon"
              sx={{ fontSize: "150px" }}
            />

            <div className="content-container">
              <Typography className="user-name" variant="h3">
                {user.username}
              </Typography>
              <Typography className="full-name" variant="h5">
                {user.fullName}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              onClick={createActivity}
              sx={{ margin: "20px", ml: 1.0, mb: "0" }}
            >
              Create Activity
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteAccount}
              sx={{ margin: "20px", mb: 0, ml: 1.0, backgroundColor: "red" }}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography
          className="header-style"
          sx={{ display: "flex", justifyContent: "center", mg: 2.0 }}
          variant="h4"
        >
          Activities:
        </Typography>
        <ActivityList activities={user.activities} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography
          className="header-style"
          sx={{ display: "flex", justifyContent: "center", mg: 2.0 }}
          variant="h4"
        >
          Friends:
        </Typography>
        <UserList users={user.friends} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography
          className="header-style"
          sx={{ display: "flex", justifyContent: "center", mg: 2.0 }}
          variant="h4"
        >
          Activity Invites:
        </Typography>
        <InviteList invites={user.invites} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography
          className="header-style"
          sx={{ display: "flex", justifyContent: "center", mg: 2.0 }}
          variant="h4"
        >
          Friend Requests:
        </Typography>
        <RequestList requests={user.requests} />
      </Grid>
    </Grid>
  );
};
export default MyProfilePage;
