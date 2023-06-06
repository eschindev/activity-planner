import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CommentCard({ comment }) {
  return (
    <Card sx={{ margin: "10px" }}>
      <CardContent>
        <Link to={`/user/${user._id}`}>
          <Typography variant="h5" component="div">
            {user.username}
          </Typography>
        </Link>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.fullName}
        </Typography>
      </CardContent>
    </Card>
  );
}