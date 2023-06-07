import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Button, Modal, Box } from "@mui/material";
import { QUERY_ME } from "../utils/queries";
import InviteUserList from "./InviteUserList";

export default function InviteModal({
  participantIds,
  activity,
  invites,
  setInvites,
}) {
  const { loading, data } = useQuery(QUERY_ME);
  const [modalOpen, setModalOpen] = useState(false);
  const inviteRecipientIds = invites.map((invite) => invite.recipient._id);
  const [invitable, setInvitable] = useState();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (!loading) {
      const friends = data?.getMyUser.friends;
      const filteredInvitable = friends.filter(
        (friend) =>
          !(
            participantIds.includes(friend._id) ||
            inviteRecipientIds.includes(friend._id)
          )
      );
      setInvitable(filteredInvitable);
      setCurrentUser(data?.getMyUser);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "inline-flex" }}>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ margin: "20px" }}
      >
        Invite Friends
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box>
          <InviteUserList
            invitable={invitable}
            activity={activity}
            setInvitable={setInvitable}
            invites={invites}
            setInvites={setInvites}
            currentUser={currentUser}
          />
        </Box>
      </Modal>
    </div>
  );
}
