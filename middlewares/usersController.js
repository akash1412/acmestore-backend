const User = require('../model/userModel');

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      status: 'success',
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
};
