const Item = require('../model/itemModel');

const searchItem = async (req, res, next) => {
  try {
    const { q } = req.query;

    const reg = new RegExp(q, 'i');

    const data = await Item.find();

    const searchResults = data.filter((item) => reg.test(item));

    res.status(200).json({
      totalResults: searchResults.length,
      data: {
        searchResults,
      },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = searchItem;
