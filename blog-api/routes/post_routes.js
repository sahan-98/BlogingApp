const express = require('express');
const router = express.Router();
const RequiredLogin = require('../services/user_auth')

const { createPost, getPost ,getPostDetailsbyID, searchBlogPosts, updatePost, deletePost } = require('../controllers/post_controller');


router.post('/', RequiredLogin, createPost);
router.get('/',  getPost);
router.get('/:id', getPostDetailsbyID);
router.get('/search/:key',[],RequiredLogin, searchBlogPosts);
router.put('/update/:id',RequiredLogin, updatePost);
router.delete('/delete/:id',RequiredLogin, deletePost);


module.exports = router;