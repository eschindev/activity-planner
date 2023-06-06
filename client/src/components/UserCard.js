import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Grid, Typography } from "@mui/material";
import "../style/userCardStyle.css";

export default function UserCard({ user }) {
  return (
    <div className="user-container">
      <motion.div
        className="user-content"
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Link to={`/user/${user.username}`}>
                <AccountBoxIcon
                  className="custom-icon"
                  style={{ fontSize: 60 }}
                />
              </Link>
            </Grid>
            <Grid item xs={8}>
              <Link to={`/user/${user.username}`}>
                <Typography variant="h5" component="div">
                  {user.username}
                </Typography>
              </Link>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {user.fullName}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </motion.div>
    </div>
  );
}
