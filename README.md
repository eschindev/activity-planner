# Actio: An Activity-planner app
A gif image of the deployed application:
![](client/public/actio.gif)
## Technology Used
| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | 
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |
| Node.js | [https://nodejs.org/](https://nodejs.org/)   |    
| React | [https://react.dev/](https://react.dev/)      |
| JWT | [https://jwt.io/](https://jwt.io/)  |
| Dayjs | [https://day.js.org/](https://day.js.org/)     |
| GraphQL | [https://graphql.org/](https://graphql.org/)    |
| BCrypt  | [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)    |
| Express | [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)    |
| Apollo  | [https://www.apollographql.com/](https://www.apollographql.com/)    |
| Mongoose | [https://mongoosejs.com/](https://mongoosejs.com/)   |
| MongoDB | [https://www.mongodb.com/](https://www.mongodb.com/)    |
| Material UI | [https://mui.com/](https://mui.com/)   |
| Framer motion | [https://www.framer.com/motion/](https://www.framer.com/motion/) |
| Fuse.js | [https://fusejs.io/](https://fusejs.io/)    |
| Dotenv | [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)     |

## Description
Deployed application can be found through [this link](https://actio-app.herokuapp.com/ "this link").  Actio is a fully-functioning MERN-stack application employing the use of MongoDB for back-end database, GraphQL for API, Express.js and Node.js for server and a React front-end. 


## Usage
Built to serve the purpose of an activity planner application, Actio allows user to create account in order to log in. The logged in user is authenticated with JWT technology. Users can do the following:

| Categories   |   Functionalities     | 
| ------------- |:-------------:| 
| User account | Sign up, log in and delete account |
| Activities | Create activities, edit activities, delete activities, create invite, delete invite, Search for activities, Comment on activities|
| Friends | Add friends, View list of friends |
| Users | Search for users, view their activities  |

## Learning Points
| Topic   |   What is learned     | 
| ------------- |:-------------:| 
| Alternative API | Using GraphQL to build API through defining TypeDefs and Resolvers |
| Querying/mutating Database  | Through the use of Apollo Server and Apollo Client |
| Rendering data to front end | Using JSX components to render data from back end |
| Polishing UI components | Through using professional component libraries |
| Database | Through the use of Cloud database (MongoDB Atlas) and local GUI (Compass) |

## Code Samples

```
// code sample from Usercard component to create friend request
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Grid, Typography, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_REQUEST } from "../utils/mutations";
import "../style/userCardStyle.css";

export default function UserCard({
  user,
  currentUserId,
  currentUserRequestSenderIds,
}) {
  const [requestSent, setRequestSent] = useState(false);
  const [createRequest, { error }] = useMutation(CREATE_REQUEST);

  const userFriendIds = user?.friends.map((friend) => friend._id);
  const userRequestSenderIds = user?.requests.map(
    (request) => request.sender._id
  );

  const sendFriendRequest = async () => {
    try {
      await createRequest({
        variables: { recipient: user._id },
      });
      setRequestSent(true);
    } catch (error) {
      window.alert(error);
    }
  };


```

```
//sample code for resolver for activity
const { Activity, User, Invite } = require("../../models");
const { AuthenticationError } = require("apollo-server-express");
const { isAuthenticated } = require("../../utils/auth");

const resolvers = {
  Query: {
    getAllActivities: async (_, __, context) => {
      isAuthenticated(context, "You must be logged in to view activities.");
      const activities = await Activity.find();
      return activities;
    },

    getActivityById: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to view activities.");
      const activity = await Activity.findById(_id)
        .populate("owner")
        .populate({
          path: "participants",
          populate: [
            { path: "friends", model: "User" },
            { path: "requests", model: "Request" },
          ],
        })
        .populate({
          path: "invites",
          populate: [
            {
              path: "sender recipient",
              model: "User",
            },
            {
              path: "activity",
              model: "Activity",
            },
          ],
        })
        .populate({
          path: "comments",
          populate: {
            path: "user",
            model: "User",
          },
        });
      return activity;
    },

```




## Author Info
### Evan Schindler
* [Github](https://github.com/eschindev "Github")
* [LinkedIn](https://www.linkedin.com/in/schindlerevan/ "LinkedIn")

### Kenneth Cruz
* [Github](https://github.com/cruzkenneth504 "Github")
* [LinkedIn](https://www.linkedin.com/in/cruzkenneth504/ "LinkedIn")

### Suchaya Osatis
* [Github](https://github.com/osuchaya "Github")
* [LinkedIn](https://www.linkedin.com/in/suchaya-osatis-0b81a378/ "LinkedIn")


