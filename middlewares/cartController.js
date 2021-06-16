const Cart = require('../model/cartModel');

const getUserCartItems = async (req, res, next) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      data: {
        cartItems,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addOrUpdateCartItem = async (req, res, next) => {
  try {
    if (!req.body.user) req.body.user = req.user.id;

    let item;
    // check f the product already exits in cart, if yes then increase quantity
    item = await Cart.findOne({ itemID: req.body.itemID });
    if (item) {
      item.quantity += 1;
    } else {
      item = new Cart(req.body);
    }

    await item.save();

    res.status(201).json({
      status: 'success',
      message: 'Item added to cart',
    });
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: 'Item delted from Cart',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserCartItems,
  addOrUpdateCartItem,
  deleteCartItem,
};
