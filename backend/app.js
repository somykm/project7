require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
