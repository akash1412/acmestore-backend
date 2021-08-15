const { Router } = require('express');
const { restricTo, protect } = require('../middlewares/authController');

const {
  getAllItems,
getItemsByCategory,
  createItem,
  updateItemBySlug,
  getItemBySlugName,
  deleteItemSlug,
} = require('../middlewares/storeController');

const router = Router();

router.route('/').get(getAllItems).post(createItem);

router.get('/category/:category',getItemsByCategory)

router.get('/:slug', getItemBySlugName);

router
  .route('/:slug')
  .patch(protect,restricTo('admin') ,updateItemBySlug)
  .delete(protect, restricTo('admin'), deleteItemSlug);

module.exports = router;
