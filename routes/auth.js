const { Router } = require("express");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    isLogin: true,
  });
});

router.get("/registration", (req, res) => {
  res.render("registration", {
    title: "registration",
    isRegistration: true,
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/registration", (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    address: req.body.address,
  });

  user
    .save()
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.error("Error registration user:", err);
      res.redirect("/registration");
    });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

module.exports = router;
