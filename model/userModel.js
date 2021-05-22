const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide name'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'User with this email already exists'],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
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

    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const userModel = model('User', userSchema);

module.exports = userModel;
