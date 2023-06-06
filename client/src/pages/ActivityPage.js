import React from "react";

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_ACTIVITY } from "../utils/queries";
import InviteList from "../components/InviteList";
import UserList from "../components/UserList";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";

const ActivityPage = ({ currentUserId }) => {
  if (!currentUserId) {
    window.location.replace("/login");
  }

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_ACTIVITY, {
    variables: { id: id },
  });

  const Activity = data?.getActivityById || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {Activity.name} <br />
        <span style={{ fontSize: "1rem" }}>
          is happening on {Activity.date}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        >
          {Activity.description}
          <p>Location: {Activity.location}</p>
          <h2>Participants:</h2>
          <UserList users={Activity.participants}></UserList>
          <h2>Already invited: </h2>
          <InviteList
            invites={Activity.invites}
            currentUserId={currentUserId}
          />
          <CommentList comments={Activity.comments} activityId={id}></CommentList>
          <CommentForm activityId={id}/>
         
        </blockquote>
      </div>
    </div>
  );
};
export default ActivityPage;
