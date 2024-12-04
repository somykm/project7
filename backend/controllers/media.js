const Media = require('../models/media');
const fs = require('fs');

exports.createAccount = (req, res, next) => {
  req.body.media = JSON.parse(req.body.media);
  const url = req.protocol + '://' + req.get('host');
  const media = new Media({
    description: req.body.media.description,
    imageUrl: req.file ? url + '/images/' + req.file.filename : '',
    userId: req.body.media.userId
  });
  media.save().then(
    () => {
      res.status(201).json({
        message: "Post saved successfully!"
      });
    }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      });
};

exports.getOneMedia = (req, res, next) => {               
  Media.findOne({
    _id: req.params.id
  }).then(
    (media) => {
      res.status(200).json(media);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyMedia = (req, res, next) => {
  let media = new Media({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.media = JSON.parse(req.body.media);
    media = {
      _id: req.params.id,
      description: req.body.media.description,
      likes: req.body.media.likes,
      dislikes: req.body.media.dislikes,
      imageUrl: url + '/images/' + req.file.filename,
      userId: req.body.media.userId
    };
  } else {
    media = {
      _id: req.params.id,
      description: req.body.description,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      imageUrl: req.body.imageUrl,
      usersLiked: req.body.usersLiked,
      usersDislikes: req.body.usersDisliked,
      userId: req.body.userId
    };
  }
  Media.updateOne({ _id: req.params.id }, media).then(
    () => {
      res.status(201).json({
        message: 'Media post updated successfully!'
      });
    }
  ).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
};

exports.deleteMedia = (req, res, next) => {
  Media.findOne({ _id: req.params.id }).then(
    (medai) => {
      if (!media) {
        return res.status(404).json({ error: 'Media post not found!' });
      }
      const filename = media.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Media.deleteOne({ _id: req.params.id }).then(() => {
          res.status(200).json(
            {
              message: 'Your post and image deleted!'

            });
        }
        ).catch(
          (error) => {
            res.status(400).json({ error: error });
          });
      });
    }).catch((error) => {
      res.status(500).json(
        {
          error: error
        }
      );
    });
  };


  exports.getAllMedias = (req, res, next) => {
    Media.find().then(
      (medias) => {
        res.status(200).json(medias);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.likeMedia = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    Media.findOne({ _id: req.params.id }).then((Media) => {
      if (like === 1) {
        //User likes the post 
        if (!media.usersLiked.includes(userId)) {
          media.usersLiked.push(userId);
          media.likes += 1;
        }
      } else if (like === -1) {  //User dislikes the post 
        if (!media.usersDisliked.includes(userId)) {
          media.usersDisliked.push(userId);
          media.dislikes += 1;
        }
      } else {
        //User neutral (removing like or dislike) 
        if (media.usersLiked.includes(userId)) {
          media.likes -= 1;
          media.usersLiked = media.usersLiked.filter((id) => id !== userId);
        } else if (media.usersDisliked.includes(userId)) {

          media.dislikes -= 1;
          media.usersDisliked = media.usersDisliked.filter((id) => id !== userId);
        }
      }
      media.save().then(() => {
        res.status(200).json({ message: 'Preference saved!' });
      }).catch((error) => {
        res.status(400).json({ error: error });
      });
    }).catch((error) => {
      res.status(404).json({ error: error });
    });
  };




