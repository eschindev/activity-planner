import Container from "@mui/material/Container";
import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../utils/mutations";

import Button from "@mui/material/Button";
import FriendRequestCard from "./FriendRequestCard";

const FriendRequestList = ( {requests} ) => {
console.log("here is:", requests);

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id} reqId={request._id}>
            <FriendRequestCard request={request}/>
          </li>
        ))}
      </ul>
    </div>
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
