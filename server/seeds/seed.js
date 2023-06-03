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

    await User.create(userSeeds);

    const users = await User.find({});
    const userIds = users.map((user) => user._id);

    const date = new Date().toISOString();

    for (let i = 0; i < activitySeeds.length; i++) {
      const owner = userIds[Math.floor(Math.random() * userIds.length)];
      let participants = [];
      let nonParticipants = [];
      for (id of userIds) {
        if (id === owner || Math.random() < 0.15) {
          participants.push(id);
        } else {
          nonParticipants.push(id);
        }
      }
      const activity = await Activity.create({
        ...activitySeeds[i],
        date,
        owner,
        participants,
      });
      for (id of participants) {
        await User.findByIdAndUpdate(id, {
          $addToSet: { activities: activity.id },
        });
        const invite = new Invite({
          sender: id,
          recipient: nonParticipants.pop(),
          activity: activity._id,
        });
        await invite.save();
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
          const request = new Request({
            sender,
            recipient,
          });
          await request.save();
        } else {
          await User.findByIdAndUpdate(sender, {
            $addToSet: { friends: recipient },
          });
          await User.findByIdAndUpdate(recipient, {
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
