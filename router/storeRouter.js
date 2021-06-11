const { Router } = require('express');
const { restricTo, protect } = require('../middlewares/authController');

const {
  getAllItems,

  createItem,
  updateItemBySlug,
  getItemBySlugName,
  deleteItemSlug,
} = require('../middlewares/storeController');

const router = Router();

router.route('/').get(getAllItems).post(createItem);

router.get('/:slug', getItemBySlugName);

router.route('/:slug').patch(updateItemBySlug).delete(deleteItemSlug);

// router
//   .route('/:id')
//   .get(getItemById)
//   .delete(protect, restricTo('admin'), deleteItem);

module.exports = router;
