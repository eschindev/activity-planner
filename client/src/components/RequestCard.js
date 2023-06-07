import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../utils/mutations";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import "../style/requestCard.css";

const RequestCard = ({ request }) => {
  const id = request._id;
  const [updateRequest, { error, requestData }] = useMutation(UPDATE_REQUEST);
  const handleRequestResponse = async (status) => {
    await updateRequest({
      variables: { id, status },
    });
    window.location.reload();
  };

  return (
    <Card
      sx={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3",
        background: "rgba(255,255,255, 0.8)",
        boxSizing: "border-box",
        boxShadow: "0 15px 25px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        height: "110px",
      }}
    >
      <CardContent>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mb: 1.0 }}
          variant="h5"
          component="div"
        >
          <Link
            to={`/user/${request.sender.username}`}
            style={{ textDecoration: "none" }}
          >
            <Diversity2Icon
              className="custom-icon"
              style={{ fontSize: 40, color: "teal" }}
            />
            {request.sender.fullName}
          </Link>{" "}
        </Typography>
        <div className="request-button">
          <Button
            sx={{ mr: 1.5 }}
            variant="outlined"
            color="success"
            onClick={() => handleRequestResponse("accepted")}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleRequestResponse("rejected")}
          >
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;

