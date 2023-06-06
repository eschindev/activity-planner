import React from "react";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "../style/userCardStyle.css";

export default function UserCard({ user }) {
  return (
    <CardContent className="user-content">
      <AccountBoxIcon className="custom-icon" style={{ fontSize: 60 }} />
      <Link to={`/user/${user._id}`}>
        <Typography variant="h5" component="div">
          {user.username}
        </Typography>
      </Link>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {user.fullName}
      </Typography>
    </CardContent>
  );
}
