const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  getPostComments
} = require('../controllers/postController');

const { protectApi } = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getPosts)
  .post(protectApi, createPost);

router
  .route('/:id')
  .get(getPost)
  .put(protectApi, updatePost)
  .delete(protectApi, deletePost);

router.put('/:id/like', protectApi, likePost);
router.post('/:id/comment', protectApi, addComment);
router.get('/:id/comments', getPostComments);

module.exports = router;
