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
    <Card sx={{ margin: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link to={`/user/${data.sender.username}`}>
            {data.sender.firstName}
          </Link>{" "}
          has invited{" "}
          {isRecipient ? (
            "you"
          ) : (
            <Link to={`/user/${data.recipient.username}`}>
              {data.recipient.firstName}
            </Link>
          )}{" "}
          to{" "}
          <Link to={`/activity/${data.activity._id}`}>
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
          <>
            <Button onClick={() => handleInviteResponse("accepted")}>
              Yes
            </Button>
            <Button onClick={() => handleInviteResponse("declined")}>No</Button>
            <Button onClick={() => handleInviteResponse("maybe")}>Maybe</Button>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default InviteCard;
