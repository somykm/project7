const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPosts);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id/markAsRead", auth, postCtrl.markAsRead);


module.exports = router;

