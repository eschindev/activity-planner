import React from "react";
import { Link } from "react-router-dom";
import RequestCard from "./RequestCard";
import Container from "@mui/material/Container";
import "../style/requestListCard.css"

export default function RequestList({ requests }) {
  return (
    <Container maxWidth="sm"
    style={{ maxHeight: "200px", overflow: "auto" }}
    className="request-list-container"
    >
      {requests ? (
        requests.map((request) => {
          return <RequestCard key={request._id} request={request} />;
        })
      ) : (
        <div>No requests found</div>
      )}
    </Container>
  );
}
