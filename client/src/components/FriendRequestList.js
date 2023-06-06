import Container from "@mui/material/Container";
import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../utils/mutations";

import Button from "@mui/material/Button";

const FriendRequestList = ({ requests }) => {
  const handleRequestResponse = async (id, status) => {
    const [updateRequest, { error, requestData }] = useMutation(UPDATE_REQUEST);
    const { updateData } = await updateRequest({
      variables: { id, status: "accepted"},
    });
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.sender.name}
            <Button onClick={() => handleRequestResponse(request._id, "accepted")}>
              Accept
            </Button>
            <Button onClick={() => handleRequestResponse(request._id, "rejected")}>
              Reject
            </Button>
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
