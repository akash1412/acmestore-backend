const router = require('express').Router();
const {
  signup,
  login,
  Me,
  updateMe,
  protect,
} = require('../middlewares/authController');
const { getAllUsers } = require('../middlewares/usersController');

router.post('/signup', signup);

router.post('/login', login);

router.route('/me').get(protect, Me);

router.patch('/updateMe', protect, updateMe);

router.route('/').get(getAllUsers);

module.exports = router;
