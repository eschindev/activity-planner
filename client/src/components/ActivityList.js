import React from "react";
import ActivityCard from "./ActivityCard";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

export default function ActivityList({ activities }) {
  return (
    <Container maxWidth="sm">
      {activities ? (
        activities.map((activity) => {
          return <ActivityCard key={activity._id} data={activity} />;
        })
      ) : (
        <div>No activities found</div>
      )}
    </Container>
  );
}
