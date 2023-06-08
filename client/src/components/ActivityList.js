import React, { useState } from "react";
import ActivityCard from "./ActivityCard";
import Container from "@mui/material/Container";
import Fuse from "fuse.js";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import "../style/activityList.css";

export default function ActivityList({ activities }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 4;
  const fuse = new Fuse(activities, {
    keys: ["name", "date", "location", "description"],
    includeScore: true,
    threshold: 0.4,
  });

  const filteredActivities = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : activities;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  return (
    <Container maxWidth="sm">
      <div className="search-activity">
        <input
          className="search-box"
          type="text"
          placeholder="Filter activities..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {currentActivities.length > 0 ? (
        currentActivities.map((activity) => (
          <ActivityCard key={activity._id} data={activity} />
        ))
      ) : (
        <div className="not-found-container">
          <h1 className="text">No activities found</h1>
        </div>
      )}
      {filteredActivities.length > activitiesPerPage && (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            variant="outlined"
            color="secondary"
            count={Math.ceil(filteredActivities.length / activitiesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Container>
  );
}
