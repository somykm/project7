const { Post } = require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  // Check if the file is present
  const mediaUrl = req.file ? url + "/media/" + req.file.filename : "";

  const post = new Post({
    content: req.body.content,
    mediaUrl: mediaUrl,
    userId: req.body.userId,
    reads: [],
  });

  post
    .save()
    .then((savedPost) => {
      res.status(201).json({
        message: "Post saved successfully!",
        post: savedPost,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found!" });
      }
      post.reads.push(new Date().getTime());
      post
        .save()
        .then(() => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => {
      res.status(404).json({
        error: error.message,
      });
    });
};

exports.modifyPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const postData = req.file
    ? {
        content: req.body.content,
        mediaUrl: url + "/media/" + req.file.filename,
        userId: req.body.userId,
        updatedAt: new Date(),
      }
    : {
        content: req.body.content,
        mediaUrl: req.body.mediaUrl,
        userId: req.body.userId,
        updatedAt: new Date(),
      };
  Post.update({ where: { id: req.params.id } })
    .then(() => {
      res.status(201).json({
        message: "Post updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found!" });
      }
      if (post.mediaUrl) {
        const filename = post.imageUrl.split("/media/")[1];
        fs.unlink(`media/ ${filename}`, (err) => {
          if (err) console.error("Error deleting media:", err);
        });
      }
      Post.deleteOne({ where: { id: req.params.id } })
        .then(() => {
          res.status(200).json({
            message: "Your post and media deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};
