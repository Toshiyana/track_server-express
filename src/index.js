require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json()); // have to implement before app.use(authRoutes)
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb://admin:passwordpassword@ac-0nlk9jj-shard-00-00.tbjjilh.mongodb.net:27017,ac-0nlk9jj-shard-00-01.tbjjilh.mongodb.net:27017,ac-0nlk9jj-shard-00-02.tbjjilh.mongodb.net:27017/?ssl=true&replicaSet=atlas-12q8gw-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
