const Item = require('../model/itemModel');
const ApiFeature = require('../utils/apiFeature');
const { transformResults } = require('../utils/helper');

const getAllItems = async (req, res) => {
  try {
    const Query = new ApiFeature(Item.find(), req.query);

    const Features = Query;
    // .paginate().sort().limitFields();

    const allItems = await Features.query;

    res.json({
      status: 'success',
      data: {
        items: transformResults(allItems),
      },
    });
  } catch (error) {
    res.json({
      status: 'request failed',
      error,
    });
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

const getItemsByCategory = async (req, res) => {
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
    res.json({
      status: 'request failed',
      error,
    });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    res.json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error,
    });
  }
};

const createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);

    res.json(newItem);
  } catch (error) {
    res.json({
      message: 'error',
    });
  }
};

const deleteAllItems = async (req, res) => {
  await Item.deleteMany();

  res.json({
    status: 'success',
    message: 'items deleted successfully',
  });
};

const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'item deleted successfully',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      message: 'error occured',
      error,
    });
  }
};

module.exports = {
  getAllItems,
  getItemsByCategory,
  getCategoryTypes,
  getItem,
  createItem,
  deleteAllItems,
  deleteItem,
};
