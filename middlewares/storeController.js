const Item = require('../model/itemModel');
const ApiFeature = require('../utils/apiFeature');
const { transformResults } = require('../utils/helper');

const getAllItems = async (req, res, next) => {
  try {
    const Query = new ApiFeature(Item.find(), req.query);

    const Features = Query;
    // .paginate().sort().limitFields();

    const allItems = await Features.query;

    res.status(200).json({
      status: 'success',
      data: {
        items: transformResults(allItems),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllItemsSlug = async (req, res, next) => {
  try {
    const slugs = await Item.find().select('slug');

    res.status(200).json({
      status: 'success',
      data: {
        slugs,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryTypes = async (req, res, next) => {
  try {
    const AllItems = await Item.find().select('category');

    const categoryTypes = [...new Set(AllItems.map((item) => item.category))];

    res.status(200).json({
      data: {
        types: categoryTypes,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getItemsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const items = await Item.find({ category });

    res.status(200).json({
      status: 'success',
      data: {
        total: items.length,
        items,
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
    console.log(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (error) {
    next(error);
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
  getItemsByCategory,
  getCategoryTypes,
  getAllItemsSlug,
  getItemBySlugName,
  getItemById,
  createItem,
  updateItemBySlug,
  deleteAllItems,
  deleteItemSlug,
};
