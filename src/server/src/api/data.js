const express = require("express");
const router = express.Router();

const { Permissions } = require("discord.js");

const permissionsArray = new Array([
  "ADMINISTRATOR",
  "MANAGE_GUILD",
]);

module.exports = (client) => {
  router.get("/perms/:perm", (req, res) => {
    try {
      res.status(200).json({
        status: 200,
        permissions: new Permissions(Number(req.params.perm)).any(permissionsArray),
      });
    } catch (e) {
      res.status(400).json({
        status: 400,
        permissions: new Permissions(Number(req.params.perm)).any(permissionsArray),
      });
    }
  });

  router.get("/server/:guild", (req, res) => {
    res
      .status(200)
      .json({ status: 200, is: !!client.guilds.cache.get(req.params.guild) });
  });

  router.get("/:user", (req, res) => {
    req.sessionStore.get(req.params.user, (err, sess) => {
      if (err || !sess) res.status(401).json({ status: 401, user: null });
      else res.status(200).json({ status: 200, user: sess.user });
    });
  });

  return router;
};
