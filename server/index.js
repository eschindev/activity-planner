const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.static(path.join(__dirname, "../client/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
