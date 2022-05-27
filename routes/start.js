const express = require("express");
const router = express.Router();

let adminUser = {
  username: "admin",
  password: "admin",
};
/* GET home page. */
router.get("/admin", (req, res) => {
  let form = `
  <form  action="admin" method="post">
  <h2>Logga in</h2>
  <div><input type"text" name="username">Användarnamn</div>
  <div><input type"password" name="password">Lösenord</div>
  <div><button type"submit">Spara</div>
  </form>
  `;
  res.send(form);
});
router.post("/admin", (req, res) => {
  let adminUser = {
    username: "admin",
    password: "admin",
  };
  if (
    adminUser.username == req.body.username &&
    adminUser.password == req.body.password
  ) {
    res.redirect("/api/users");
  } else res.send("Feluppgifter");
});
module.exports = router;
