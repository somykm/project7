const {Post }= require("../models");
const fs = require("fs");

exports.createAccount = (req, res, next) => {
  req.body.post = JSON.parse(req.body.post);
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    description: req.body.post.description,
    imageUrl: req.file ? url + "/images/" + req.file.filename : "",
    userId: req.body.post.userId,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  res.status(201).json({ message: "Account created successfully!" });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyPost = (req, res, next) => {
  let post = new Post({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.post = JSON.parse(req.body.post);
    post = {
      _id: req.params.id,
      description: req.body.post.description,
      likes: req.body.post.likes,
      dislikes: req.body.post.dislikes,
      imageUrl: url + "/images/" + req.file.filename,
      userId: req.body.post.userId,
    };
  } else {
    post = {
      _id: req.params.id,
      description: req.body.description,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      imageUrl: req.body.imageUrl,
      usersLiked: req.body.usersLiked,
      usersDislikes: req.body.usersDisliked,
      userId: req.body.userId,
    };
  }
  Post.updateOne({ _id: req.params.id }, post)
    .then(() => {
      res.status(201).json({
        message: "Post updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found!" });
      }
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink("images/" + filename, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({
              message: "Your post and image deleted!",
            });
          })
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((post) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likePost = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  Post.findOne({ _id: req.params.id })
    .then((Post) => {
      if (like === 1) {
        //User likes the post
        if (!post.usersLiked.includes(userId)) {
          post.usersLiked.push(userId);
          post.likes += 1;
        }
      } else if (like === -1) {
        //User dislikes the post
        if (!post.usersDisliked.includes(userId)) {
          post.usersDisliked.push(userId);
          post.dislikes += 1;
        }
      } else {
        //User neutral (removing like or dislike)
        if (post.usersLiked.includes(userId)) {
          post.likes -= 1;
          post.usersLiked = post.usersLiked.filter((id) => id !== userId);
        } else if (post.usersDisliked.includes(userId)) {
          post.dislikes -= 1;
          post.usersDisliked = post.usersDisliked.filter(
            (id) => id !== userId
          );
        }
      }
      post
        .save()
        .then(() => {
          res.status(200).json({ message: "Preference saved!" });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};
