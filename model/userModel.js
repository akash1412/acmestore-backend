const { Schema, model } = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [5, 'name length must be greater than 5 characters'],
      maxLength: [20, 'name length should not contain more than 20 characters'],
      required: [true, 'please provide name'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Please provide email'],
      unique: [true, 'User with this email already exists'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
      },
      default: 'user',
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v === this.password;
        },
        message: 'password do not match',
      },
    },
    active: {
      type: Boolean,
      default: true,
    },

    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.virtual('cartItems', {
  ref: 'Cart',
  foreignField: 'user',
  localField: '_id',
});

userSchema.pre(/^find/, function (next) {
  this.populate({ path: 'cartItems' });
  next();
});

userSchema.methods.checkPasswordChange = function (JwtTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedAt = this.passwordChangedAt.getTime() / 1000;

    //JwtTimeStamp should be greater than passwordChangedAt time

    return passwordChangedAt > JwtTimeStamp;
  }

  return false;
};

userSchema.methods.comparePasswords = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

const userModel = model('User', userSchema);

module.exports = userModel;
