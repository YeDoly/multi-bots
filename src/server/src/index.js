const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const passport = require("passport");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const { Strategy } = require("passport-discord");

const { Client } = require("discord.js");
const client = new Client();

require('dotenv').config();

client.once("ready", () => {

const contentSecurityPolicy = [
  "default-src * 'unsafe-inline' 'unsafe-eval'",
  "script-src * 'unsafe-inline' 'unsafe-eval'",
  "connect-src * 'unsafe-inline'",
  "img-src * data: blob: 'unsafe-inline'",
  "frame-src *",
  "style-src * 'unsafe-inline'",
].join(";");

const app = express();

app.set("json spaces", 2);

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/files/"));

passport.use(
  new Strategy(
    {
      clientID: client.user.id,
      clientSecret: process.env.client,
      callbackURL: process.env.callback,
      scope: ["identify", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);

app.use(
  session({
    store: new SQLiteStore({
      dir: "./data",
    }),
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", contentSecurityPolicy);
  req.headers["content-type"] = "application/json";
  next();
});

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});


  const api = {
    check: require("./api/check"),
    endpoint: require("./api/login"),
    data: require("./api/data")(client),
  };

  Object.entries(api).forEach(([key, val]) => {
    app.use("/api/" + key, val);
  });


app.get("/", (req) => console.log(req.session.user));


app.listen(process.env.port, () =>
  console.log("Server is ready on port %s!", process.env.port)
);

});

client.login(process.env.token);
