import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { UPDATE_INVITE } from "../utils/mutations";

const InviteCard = ({ data, currentUserId }) => {
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
          <Link to={`/user/${data.sender._id}`}>{data.sender.firstName}</Link>{" "}
          has invited{" "}
          {isRecipient ? (
            "you"
          ) : (
            <Link to={`/user/${data.recipient._id}`}>
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

  // return (
  //   <div className="my-3">
  //     <h3 className="card-header bg-dark text-light p-2 m-0">
  //       {data.sender.fullName} <br />
  //       <span style={{ fontSize: "1rem" }}>status: {data.status}</span>
  //     </h3>
  //     <div className="bg-light py-4">
  //       <blockquote
  //         className="p-4"
  //         style={{
  //           fontSize: "1.5rem",
  //           fontStyle: "italic",
  //           border: "2px dotted #1a1a1a",
  //           lineHeight: "1.5",
  //         }}
  //       ></blockquote>
  //     </div>
  //   </div>
  // );
};

export default InviteCard;
