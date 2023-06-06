import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../utils/mutations";

const RequestCard = ({ request }) => {
  console.log(request);
  const [updateRequest, { error, requestData }] = useMutation(UPDATE_REQUEST);
  const handleRequestResponse = async (status) => {
    debugger;
    await updateRequest({
      variables: { id: request._id, status: status },
    });
  };

  return (
    <Card sx={{ margin: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link to={`/user/${request.sender.username}`}>
            {request.sender.fullName}
          </Link>{" "}
        </Typography>
        <Button onClick={() => handleRequestResponse("accepted")}>
          Accept
        </Button>
        <Button onClick={() => handleRequestResponse("rejected")}>
          Reject
        </Button>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
//ask 'createRequest' endpoint:
//how do you use this Mutation. ask him what it (this request) returns (shape of data)
// pass create request some data e.g. user id , get response back from API
//create page that is responsible for querying all user (QUERY_USERS) get all users in our app
//map like UserList (but we don't want to have 'Add Friend' there)
//response from server
//change text on button to say Friend Request Sent!
//check if user is already a friend, so don't show
