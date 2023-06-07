import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { UPDATE_INVITE } from "../utils/mutations";
import auth from "../utils/auth.js";
import "../style/inviteCardStyle.css"

const InviteCard = ({ data }) => {
  const token = auth.getProfile();
  const currentUserId = token.data._id;
  const isRecipient = data.recipient._id === currentUserId;

  const [updateInvite, { error, inviteData }] = useMutation(UPDATE_INVITE);

  const handleInviteResponse = async (status) => {
    const id = data._id;
    const { updateData } = await updateInvite({
      variables: { id: id, status: status },
    });
  };

  return (
    <Card  sx={{
      margin: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "3px",
      background: "rgba(255,255,255, 0.8)",
      boxSizing: "border-box",
      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.5)",
      borderRadius: "10px",
      height: "150px"
    }}>
      <CardContent >
        <Typography variant="h5" component="div">
          <Link to={`/user/${data.sender.username}`} style={{ textDecoration: 'none' }}>
            {data.sender.firstName}
          </Link>{" "}
          has invited{" "}
          {isRecipient ? (
            "you"
          ) : (
            <Link to={`/user/${data.recipient.username}`} style={{ textDecoration: 'none' }}>
              {data.recipient.firstName}
            </Link>
          )}{" "}
          to{" "}
          <Link to={`/activity/${data.activity._id}`} style={{ textDecoration: 'none' }}>
            {data.activity.name}
          </Link>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {dayjs(data.activity.date).format("DD-MM-YYYY HH:MM")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.activity.location}
        </Typography>
        {isRecipient ? (
         <div className="button-container">
            <Button variant="outlined" color="success" onClick={() => handleInviteResponse("accepted")}>
              Yes
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleInviteResponse("declined")}>No</Button>
            <Button  variant="outlined" color="secondary" onClick={() => handleInviteResponse("maybe")}>Maybe</Button>
            </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default InviteCard;
