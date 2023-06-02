const db = require("../config/connection");
const { User, Activity, Invite, Request } = require("../models");
const userSeeds = require("./userSeeds.json");
const activitySeeds = require("./activitySeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Activity.deleteMany({});
    await Invite.deleteMany({});
    await Request.deleteMany({});

    const users = await User.create(userSeeds);
    const userIds = users.map(({ _id }) => _id);

    const date = new Date().toISOString();

    for (let i = 0; i < activitySeeds.length; i++) {
      const owner = userIds[Math.floor(Math.random() * userIds.length)];
      let participants;
      let nonParticipants;
      for (id in userIds) {
        if ((userId) => userId === owner || Math.random() < 0.08) {
          participants.push(userId);
        } else {
          nonParticipants.push(userId);
        }
      }
      const activity = await Activity.create({
        ...activitySeeds[i],
        date,
        owner,
        participants,
      });
      for (userId in participants) {
        await User.findByIdAndUpdate(userId, {
          $addToSet: { activities: activity._id },
        });
        await Invite.create({
          sender: userId,
          recipient: nonParticipants.pop(),
          activity: activity._id,
        });
      }
    }

    const friends = {};

    for (let i = 0; i < 140; i++) {
      const sender = userIds[Math.floor(Math.random() * userIds.length)];
      const recipient = userIds[Math.floor(Math.random() * userIds.length)];
      if (
        sender !== recipient &&
        friends[sender] !== recipient &&
        friends[recipient] !== sender
      ) {
        if (Math.random() < 0.3) {
          await Request.create({
            sender,
            recipient,
          });
        } else {
          User.findByIdAndUpdate(sender, {
            $addToSet: { friends: recipient },
          });
          User.findByIdAndUpdate(recipient, {
            $addToSet: { friends: sender },
          });
        }
        friends[sender] = recipient;
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
