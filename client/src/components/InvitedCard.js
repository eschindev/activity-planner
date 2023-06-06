import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_INVITE } from "../utils/mutations";

const InvitedCard = ({ data }) => {
  const [visible, setVisible] = useState(true);
  const [updateInvite, { error, inviteData }] = useMutation(UPDATE_INVITE);

  const handleInviteResponse = async (event) => {
    console.log(event.target.innerText);
    const id = data._id;

    const status = "accepted";
    console.log(id);

    const { updateData } = await updateInvite({
      variables: { id: id, status: status },
    });
    console.log(updateData);
    setVisible(false);
  };
  if (!visible) {
    return <div></div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {data.sender.fullName} <br />
        <span style={{ fontSize: "1rem" }}>status: {data.status}</span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        ></blockquote>

        <button onClick={handleInviteResponse}>Yes</button>
        <button onClick={handleInviteResponse}>No</button>
        <button onClick={handleInviteResponse}>Maybe</button>
      </div>
    </div>
  );
};

export default InvitedCard;
