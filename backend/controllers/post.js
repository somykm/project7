const { Post } = require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const mediaUrl = req.file ? url + "/media/" + req.file.filename : "";

  const postData = {
    content: req.body.content,
    mediaUrl: mediaUrl,
    userId: req.body.userId,
    reads: [],
  };
  try {
    Post.create(postData)
      .then((savedPost) => {
        res
          .status(201)
          .json({ message: "Post saved successfully!", post: savedPost });
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found!" });
      }
      post.reads.push(req.auth.userId);
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
  Post.update(postData, { where: { id: req.params.id } })
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

exports.deletePost = async (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found!" });
      }
      if (post.mediaUrl) {
        const filename = post.mediaUrl.split("/media/")[1];
        console.log("Deleting media file:", filename);
        fs.unlink(`media/${filename}`, (err) => {
          if (err) {
            console.error("Error deleting media:", err);
            return res
              .status(500)
              .json({ error: "Error deleting media file!" });
          }
        });
      }
      Post.destroy({ where: { id: req.params.id } })
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
  Post.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.markAsRead = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.auth.userId;

    console.log(`Marking post ${postId} as read by user ${userId}`);

    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    console.log(`Current reads for post ${postId}: ${post.reads}`);

    if (!Array.isArray(post.reads)) {
      post.reads = []; 
    }

    if (!post.reads.includes(userId)) {
      post.reads.push(userId);
      await post.save();

      console.log(`Updated reads for post ${postId}: ${post.reads}`);
    }

    res.status(200).json({ message: "Post marked as read" });
  } catch (error) {
    console.error("Error marking post as read:", error);
    res.status(500).json({ error: error.message });
  }
};
