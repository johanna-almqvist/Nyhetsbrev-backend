const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 3010;
const UserRoute = require("./routes/user-route");
const StartRoute = require("./routes/start");
const mongoose = require("mongoose");
var path = require("path");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", UserRoute);
app.use("/", StartRoute);

async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect("mongodb://localhost:27017/useradmin", options);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, () =>
    console.log(`Server is up and running on port: ${PORT}`)
  );
}
init();
