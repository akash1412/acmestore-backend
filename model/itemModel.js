const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [5, 'cannot set price lower than 5'],
      max: [2000, 'cannot set price higher than 2000'],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      enum: {
        values: ['men', 'women', 'hat', 'jacket', 'sneaker'],
        message: '{VALUE} is not supported',
      },
    },
  },
  {
    timestamps: true,
  }
);

itemSchema.pre('save', function (next) {
  this.slug = slugify(this.title);

  next();
});

const Item = model('items', itemSchema);

module.exports = Item;
