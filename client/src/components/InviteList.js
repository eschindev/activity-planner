import React from "react";
import { Link } from "react-router-dom";
import InviteCard from "./InviteCard";
import Container from "@mui/material/Container";
import "../style/inviteListContainer.css";

const InviteList = ({ invites }) => {
  return (
    <Container
      maxWidth="sm"
      style={{ maxHeight: "300px", overflow: "auto" }}
      className="invite-list-container"
    >
      {invites && invites.length > 0 ? (
        invites.map((invite) => (
          <InviteCard key={invite._id || Math.random()} data={invite} />
        ))
      ) : (
        <div>There are currently no invites</div>
      )}
    </Container>
  );
};

export default InviteList;
