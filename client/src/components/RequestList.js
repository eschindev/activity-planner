import React from "react";
import { Link } from "react-router-dom";
import RequestCard from "./RequestCard";
import Container from "@mui/material/Container";
import "../style/requestListCard.css"
import "../style/notFound.css"

export default function RequestList({ requests }) {
  return (
    <Container maxWidth="sm"
    style={{ maxHeight: "300px", overflow: "auto" }}
    className="request-list-container"
    >
      {requests ? (
        requests.map((request) => {
          return <RequestCard key={request._id} request={request} />;
        })
      ) : (
        <div className="not-found-container">
        <h1 className="text">No requests found</h1>
      </div>
      )}
    </Container>
  );
}
