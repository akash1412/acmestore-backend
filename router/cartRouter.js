const router = require('express').Router();
const {
  addOrUpdateCartItem,
  getUserCartItems,
  deleteCartItem,
  updateCartItemQuantity,
  clearCartItems,
} = require('../middlewares/cartController');
const { protect } = require('../middlewares/authController');

router
  .route('/')
  .get(protect, getUserCartItems)
  .post(protect, addOrUpdateCartItem);

router
  .route('/item/:id')
  .patch(protect, updateCartItemQuantity)
  .delete(protect, deleteCartItem);

router.route('/all/clearAll').delete(protect, clearCartItems);

module.exports = router;
