const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({
            message: "User created successfully!",
          });
        })
        .catch((error) => {
          if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({ error: "Email address already in use!" });
          } else {
            res.status(500).json({ error: error.message });
          }
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email }})
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
          });
          res.status(200).json({
            userId: user.id,
            token: token
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

