const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    heat: req.body.sauce.heat,
    imageUrl: req.file ? url + '/images/' + req.file.filename : '',
    mainPepper: req.body.sauce.mainPepper,
    userId: req.body.sauce.userId
  });
  sauce.save().then(
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

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.Errorname,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      userId: req.body.sauce.userId
    };
  } else {
    sauce = {
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      imageUrl: req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      usersLiked: req.body.usersLiked,
      usersDislikes: req.body.usersDisliked,
      userId: req.body.userId
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      if (!sauce) {
        return res.status(404).json({ error: 'Sauce not found!' });
      }
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({ _id: req.params.id }).then(() => {
          res.status(200).json(
            {
              message: 'Sauce and image deleted!'

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


  exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      if (like === 1) {
        //User likes the sauce 
        if (!sauce.usersLiked.includes(userId)) {
          sauce.usersLiked.push(userId);
          sauce.likes += 1;
        }
      } else if (like === -1) {  //User dislikes the sauce 
        if (!sauce.usersDisliked.includes(userId)) {
          sauce.usersDisliked.push(userId);
          sauce.dislikes += 1;
        }
      } else {
        //User neutral (removing like or dislike) 
        if (sauce.usersLiked.includes(userId)) {
          sauce.likes -= 1;
          sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
        } else if (sauce.usersDisliked.includes(userId)) {

          sauce.dislikes -= 1;
          sauce.usersDisliked = sauce.usersDisliked.filter((id) => id !== userId);
        }
      }
      sauce.save().then(() => {
        res.status(200).json({ message: 'Preference saved!' });
      }).catch((error) => {
        res.status(400).json({ error: error });
      });
    }).catch((error) => {
      res.status(404).json({ error: error });
    });
  };




