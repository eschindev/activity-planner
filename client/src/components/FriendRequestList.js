import Container from "@mui/material/Container";
import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../utils/mutations";

import Button from "@mui/material/Button";
import FriendRequestCard from "./FriendRequestCard";

const FriendRequestList = ({ requests }) => {
  console.log("here is:", requests);

  return (
    <Container maxWidth="sm">
      {requests.map((request) => (
        <FriendRequestCard request={request} key={request._id} />
      ))}
    </Container>
  );
};

export default FriendRequestList;

// export default function RequestsReceived({ requests }) {
//   console.log(requests);
//   return (
//     <Container maxWidth="sm">
//       {users ? (
//         requests.map((request) => {
//           return <Request key={user._id} user={user} />;
//         })
//       ) : (
//         <div>No users found</div>
//       )}
//     </Container>
//   );
// }
