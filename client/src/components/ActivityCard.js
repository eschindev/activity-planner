import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../style/activityCard.css"

const ActivityCard = ({ data }) => {
  return (
    <motion.div
      className="activity-content"
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <CardContent>
        <Link to={`/activity/${data._id}`}>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
        </Link>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.location}
        </Typography>
      </CardContent>
    </motion.div>
  );
};


export default ActivityCard;
