import { useQuery } from "@apollo/client";
import { QUERY_USERNAME, QUERY_ME } from "../utils/queries";
import { CREATE_REQUEST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import ActivityList from "../components/ActivityList";
import UserList from "../components/UserList";
import { Grid, Typography, Button } from "@mui/material";
import auth from "../utils/auth.js";

const ProfilePage = () => {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }
  const token = auth.getProfile();
  const currentUserId = token.data._id;

  const [createRequest, { error }] = useMutation(CREATE_REQUEST);
  const { myData } = useQuery(QUERY_ME);

  let currentUserFriendIds = [];
  if (myData) {
    currentUserFriendIds = myData.getMyUser.friends.map((friend) => friend._id);
  }

  const { username } = useParams();
  const { loading, data } = useQuery(QUERY_USERNAME, {
    variables: { username: username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  const user = data?.getUserByUsername || {};

  const sendFriendRequest = async () => {
    console.log("user: ", user);
    try {
      await createRequest({
        variables: { recipient: user._id },
      });
    } catch (error) {
      window.alert(error);
    }
  };

  console.log(user);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <Typography variant="h2">{user.username}</Typography>
            <Typography variant="h5">{user.fullName}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            {!currentUserFriendIds.includes(user._id) ? (
              <Button
                variant="contained"
                onClick={sendFriendRequest}
                sx={{ mt: "20px" }}
              >
                Add Friend
              </Button>
            ) : null}
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
    </Grid>
  );
};

export default ProfilePage;
