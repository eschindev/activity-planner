import React from "react";
import { Link } from "react-router-dom";
import RequestCard from "./RequestCard";
import Container from "@mui/material/Container";

export default function RequestList({ requests }) {
  return (
    <Container maxWidth="sm">
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
