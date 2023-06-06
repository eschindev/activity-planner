import Container from "@mui/material/Container";
import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../utils/mutations";

import Button from "@mui/material/Button";

const FriendRequestCard = ({ request }) => {

  const [updateRequest, { error, requestData }] = useMutation(UPDATE_REQUEST);
  const handleRequestResponse = async (event, status) => {
    const id = request._id;
    console.log(request);
    
    console.log(event.target.parentElement);
    const { updateData } = await updateRequest({
      variables: { id: id, status: status},
    });
  };

  return (
   
          <li key={request._id} reqId={request._id}> {/*Do NOT get rid of this key when formatting!!! */}
            {request.sender.fullName}
            <Button onClick={(event) => handleRequestResponse(event, "accepted")}>
              Accept
            </Button>
            <Button onClick={(event) => handleRequestResponse(event, "rejected")}>
              Reject
            </Button>
          </li>
        )};

export default FriendRequestCard;

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
