const { Router } = require('express');
const { restricTo, protect } = require('../middlewares/authController');
const {
  getAllItems,
  getItemsByCategory,
  getCategoryTypes,
  createItem,
  getItem,
  deleteItem,
} = require('../middlewares/storeController');
// const { protect } = require("../middlewares/auth");

const router = Router();

router.route('/').get(getAllItems).post(createItem);

router.route('/category/:category').get(getItemsByCategory);

router.get('/category-types', getCategoryTypes);

router
  .route('/:id')
  .get(getItem)
  .delete(protect, restricTo('admin'), deleteItem);

module.exports = router;
