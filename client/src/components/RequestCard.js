import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { CREATE_REQUEST } from "../utils/mutations";

const RequestCard = ({ user }) => {
  console.log(user);
  const [createRequest, { error, requestData }] = useMutation(CREATE_REQUEST);
  const handleAddFriend = async () => {
    try {
    const { createResponse } = await createRequest({variables: { recipient: user._id }});
    console.log(createResponse);}
    catch (error) {
        console.error (error);
        alert(error)
        
    }
  };

  return (
    <Card sx={{ margin: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link to={`/user/${user._id}`}>{user.firstName}</Link>{" "}
        </Typography>
        <Button onClick={handleAddFriend}>Add Friend</Button>
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
