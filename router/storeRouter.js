const { Router } = require('express');
const { restricTo, protect } = require('../middlewares/authController');
const {
  getAllItems,
  getItemsByCategory,
  getCategoryTypes,
  getAllItemsSlug,
  createItem,
  getItemById,
  getItemBySlugName,
  deleteItem,
} = require('../middlewares/storeController');
// const { protect } = require("../middlewares/auth");

const router = Router();

router.route('/').get(getAllItems).post(createItem);

router.route('/category/:category').get(getItemsByCategory);

router.get('/slugs', getAllItemsSlug);

router.get('/category-types', getCategoryTypes);

router.get('/:slug', getItemBySlugName);

// router
//   .route('/:id')
//   .get(getItemById)
//   .delete(protect, restricTo('admin'), deleteItem);

module.exports = router;
