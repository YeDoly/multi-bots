const express = require("express");
const router = express.Router();

router.all("*", function (req, res, next) {
  if (req.method != "GET" && req.get("content-type") != "application/json")
    return res
      .status(406)
      .send(
        "Error: Not Acceptable | The „Content-Type” header was expected to be „application/json”"
      );
  next();
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body != ("object" || "array"))
    return res.sendStatus(400);
  res.sendStatus(201);
});

router.all("/", function (req, res) {
  res.sendStatus(405);
});

router.all("/*", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
