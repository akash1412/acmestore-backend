const Cart = require('../model/cartModel');
const AppError = require('../utils/appError');

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
    if (!req.body.user) req.body.user = req.user._id;

    let item;
    // check f the product already exits in cart, if yes then increase quantity
    // here using finOne with itemID,because we don't know if the product exists already in the cart or not,
    //so in order to search with unique id we use itemID

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

      data: {
        item,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItemQuantity = async (req, res, next) => {
  try {
    const type = req.body.type.trim();

    // if type !== 'DEC' || 'INC' , thow error;

    if (type !== 'DEC' && type !== 'INC') {
      return next(new AppError('Invalid type, only "DEC" & "INC" ', 400));
    }

    let item = await Cart.findOne({ _id: req.params.id });

    if (type === 'INC') {
      item.quantity += 1;
    }

    if (type === 'DEC') {
      item.quantity -= 1;
    }

    await item.save();

    res.status(200).json({
      status: 'success',
      message: 'Item quantity updated',
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

const clearCartItems = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user.id });
    res.json({ message: 'cleared all cart items' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserCartItems,
  addOrUpdateCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCartItems,
};
