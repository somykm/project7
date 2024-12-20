const {Post }= require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  //TODO add condition to check if the file is present
  //if the file is not present then use the req.body as the sauce info
  //otherwise do what I do 
  //tip:look at modify post bellow
  // req.body.post = JSON.parse(req.body.post);
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    content: req.body.content,
    mediaUrl: req.file ? url + "/media/" + req.file.filename : "",
    userId: req.body.userId,
    reads:[],
  });
  post
    .save()
    .then((savedPost) => {
      res.status(201).json({
        message: "Post saved successfully!",
        post:savedPost,
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
    id: req.params.id,
  })
    .then((post) => {
      if (!post) { return res.status(404).json({ error: "Post not found!" }); }
      post.reads += 1;
      post.save() .then(() => res.status(200).json(post)) .catch((error) => res.status(400).json({ error: error.message}));
    })
    .catch((error) => {
      res.status(404).json({
        error: error.message,
      });
    });
};

exports.modifyPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const postData =req.file
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
  Post.updateOne({ id: req.params.id }, postData)
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

// exports.deletePost = (req, res, next) => {
//   Post.findOne({ id: req.params.id })
//     .then((post) => {
//       if (!post) {
//         return res.status(404).json({ error: "Post not found!" });
//       }
//       const filename = post.imageUrl.split("/media/")[1];
//       fs.unlink("media/" + filename, () => {
//         Post.deleteOne({ id: req.params.id })
//           .then(() => {
//             res.status(200).json({
//               message: "Your post and media deleted!",
//             });
//           })
//           .catch((error) => {
//             res.status(400).json({ error: error.message });
//           });
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error.message,
//       });
//     });
// };

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.likePost = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  Post.findOne({ id: req.params.id })
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
