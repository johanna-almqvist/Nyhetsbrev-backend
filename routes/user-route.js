const express = require("express");
const router = express.Router();
const UserModel = require("../models/user-model");

router.get("/", async (req, res) => {
  const users = await UserModel.find();

  console.log(users);

  let printUsers = `<div>
  <h2>Alla Användare</h2>
  <a href="users/subscribe">
  Lista på prenumeranter
  </a>
  `;

  users.forEach((user) => {
    printUsers += `<div> 
      <h4>${user.email}</h4>
      <p>Prenumererar: ${user.subscribe}</p>
      </div>`;
  });
  printUsers += "</div>";
  res.send(printUsers);
});

router.get("/subscribe", async (req, res) => {
  const users = await UserModel.find({ subscribe: "true" });

  console.log(users);

  let printUsers = `<div>
  <h2>Alla Prenumeranter</h2>
  <a href="/api/users">
  Tillbaka
  </a>
  </div>
  `;
  users.forEach((user) => {
    printUsers += `<div> 
      <h4>${user.email}</h4>
      </div>
      </div>`;
  });
  res.send(printUsers);
});

router.post("/", async (req, res) => {
  const { email } = req.body;
  const foundUser = await UserModel.findOne({ email });
  if (foundUser) {
    res.status(418).json("User alredy exists");
  } else {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  }
});
router.put("/", async (req, res) => {
  const { email, subscribe } = req.body;
  const filter = { email };
  const update = { subscribe };
  const foundUser = await UserModel.findOneAndUpdate(filter, update);
  res.status(200).json(foundUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email, password });
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(403).json("Fel uppgifter");
  }
});
module.exports = router;
