import React from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

export default function UserList({ users }) {
  console.log(users);
  return (
    <div>
      {users ? (
        users.map((user) => {
          return <UserCard key={user._id} user={user} />;
        })
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}
