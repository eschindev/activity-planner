import React from "react";
import ActivityCard from "./ActivityCard";
import { Link } from "react-router-dom";

export default function ActivityList({ activities }) {
  return (
    <div>
      {activities ? (
        activities.map((activity) => {
          return <ActivityCard key={activity._id} data={activity} />;
        })
      ) : (
        <div>No activities found</div>
      )}
    </div>
  );
}
