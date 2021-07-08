const router = require('express').Router();
const {
  addOrUpdateCartItem,
  getUserCartItems,
  deleteCartItem,
  updateCartItemQuantity,
} = require('../middlewares/cartController');
const { protect } = require('../middlewares/authController');

router
  .route('/')
  .get(protect, getUserCartItems)
  .post(protect, addOrUpdateCartItem);

router
  .route('/:id')
  .patch(protect, updateCartItemQuantity)
  .delete(protect, deleteCartItem);

module.exports = router;
