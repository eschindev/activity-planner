import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ACTIVITIES, QUERY_USERS } from "../utils/queries";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserList from "../components/UserList";
import ActivityList from "../components/ActivityList";
import auth from "../utils/auth.js";

export default function SearchResultPage({ currentUserId }) {
  if (!auth.loggedIn()) {
    window.location.replace("/login");
  }

  let { searchType, searchTerm } = useParams();
  searchTerm = decodeURIComponent(searchTerm);
  const { loading, data } = useQuery(
    searchType === "users" ? QUERY_USERS : QUERY_ACTIVITIES,
    { variables: { searchTerm } }
  );

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

  if (!data) {
    return (
      <div>Search failed. Confirm that you are logged in and try again.</div>
    );
  }

  switch (searchType) {
    case "users":
      return <UserList users={data.searchUsers} />;
    case "activities":
      return <ActivityList activities={data.searchActivities} />;
    default:
      return <div>Invalid search type</div>;
  }
}
