const express = require('express');
const router = express.Router();

const { saveUser, loginUser } = require('../controllers/user_controller');


router.post('/signup', [], saveUser);
router.post('/login', [], loginUser);

module.exports = router;