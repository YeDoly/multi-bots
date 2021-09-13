const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get(
  "/login",
  (req, res, next) => next(),
  passport.authenticate("discord")
);

router.get(
  "/",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("http://localhost:8080/login/" + req.session.id);
  }
);

router.get("/logout/:id", function (req, res) {
  req.sessionStore.get(req.params.id, (err, sess) => {
    if (err || !sess) res.status(401).json({ status: 401 });
    else
      req.session.destroy(() => {
        res.status(200).json({ status: 200 });
      });
  });
});

module.exports = router;
