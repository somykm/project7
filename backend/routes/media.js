const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const mediaCtrl = require('../controllers/media');

router.post('/',auth,multer, mediaCtrl.createAccount);
router.get('/:id', auth, mediaCtrl.getOneMedia);
router.get('/', auth, mediaCtrl.getAllMedias);
router.put('/:id', auth, multer, mediaCtrl.modifyMedia);
router.delete('/:id', auth, mediaCtrl.deleteMedia);
router.post('/:id/like', auth, mediaCtrl.likeMedia);


module.exports = router;



