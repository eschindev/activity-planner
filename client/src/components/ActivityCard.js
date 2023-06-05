import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ActivityCard = ({ data }) => {
  return (
    <Card sx={{ margin: "10px" }}>
      <CardContent>
        <Link to={`/activity/${data._id}`}>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
        </Link>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
