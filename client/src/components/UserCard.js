import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function UserCard({ user }) {
  return (
    <Link to={`/user/${user._id}`}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {user.username}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {user.fullName}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
