const Item = require('../model/itemModel');
const APIFeature = require('../utils/apiFeature');

const getAllItems = async (req, res, next) => {
  try {
    // eslint-disable-next-line prefer-const
    const totalDocuments = await Item.countDocuments();

    const feature = new APIFeature(Item.find(), req.query, totalDocuments)
      .filter()
      .paginate();

    const items = await feature.query;

    res.status(200).json({
      status: 'success',
      data: {
        total: items.length,
        curPage: req.query.page || 1,
        prevPage: items,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getItemBySlugName = async (req, res, next) => {
  try {
    const item = await Item.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { item: newItem },
    });
  } catch (error) {
    next(error);
  }
};

const updateItemBySlug = async (req, res, next) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { runValidators: true, new: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        item: updatedItem,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllItems = async (req, res, next) => {
  try {
    await Item.deleteMany();

    res.status(204).json({
      status: 'success',
      message: 'All Items deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteItemSlug = async (req, res, next) => {
  try {
    await Item.findOneAndDelete({ slug: req.params.slug });

    res.status(204).json({
      status: 'success',
      message: 'item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  getItemBySlugName,
  createItem,
  updateItemBySlug,
  deleteAllItems,
  deleteItemSlug,
};
