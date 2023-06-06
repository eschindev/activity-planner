import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "../style/activityCard.css"

const ActivityCard = ({ data }) => {
  return (
    <div className="activity-container">
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
            <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
              <TheaterComedyIcon className="activity-icon" sx={{ mr: 1.5, fontSize: "30px"}} />{data.name}
            </Typography>
          </Link>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <CalendarMonthIcon className="calendar-icon" sx={{ mr: 1.5, fontSize:"30px" }} />{data.date}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <LocationOnIcon className="location-icon" sx={{ mr: 1.5, fontSize:"30px" }} /> {data.location}
          </Typography>
        </CardContent>

      </motion.div>
    </div>

  );
};


export default ActivityCard;
