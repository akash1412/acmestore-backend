const router = require('express').Router();
const {
  addOrUpdateCartItem,
  getUserCartItems,
  deleteCartItem,
} = require('../middlewares/cartController');
const { protect } = require('../middlewares/authController');

router
  .route('/')
  .get(protect, getUserCartItems)
  .post(protect, addOrUpdateCartItem);

router.route('/:id').delete(protect, deleteCartItem);

module.exports = router;
