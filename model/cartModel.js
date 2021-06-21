const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A cart item must have a name'],
    },
    image: {
      type: String,
      required: [true, ' a cart item must have a image'],
    },
    price: {
      type: Number,
      required: [true, 'A cart item must have a price'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter quantity'],
      default: 1,
    },
    itemID: {
      type: mongoose.Schema.ObjectId,
      ref: 'Item',
      required: [true, 'A Cart item must have a id'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Cart Must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
