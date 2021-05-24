const router = require('express').Router();
const {
  signup,
  login,
  signout,
  Me,
  forgotPassword,
  updateMe,
  protect,
} = require('../middlewares/authController');
const { getAllUsers } = require('../middlewares/usersController');

router.post('/signup', signup);

router.post('/login', login);

router.delete('/signout', protect, signout);

router.post('/forgot-password', forgotPassword);

router.route('/me').get(protect, Me);
//protect,
router.patch('/updateMe', protect, updateMe);

router.route('/').get(getAllUsers);

module.exports = router;
