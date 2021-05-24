const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const AppError = require('../utils/appError');

const signToken = (userID) =>
  jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: '100d',
  });

const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    // !(await bcrypt.compare(password, user.password))
    if (!user || !user.comparePasswords(password)) {
      return next(new AppError('Incorrect email or password', 400));
    }

    res.status(200).json({
      status: 'success',
      token: signToken(user._id),
      data: {
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

// const signout =(req,res,next)=>{

// }

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('you are not logged in, please login to access!', 401)
      );
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError('user does not exists', 401));
    }

    if (currentUser.checkPasswordChange(decoded.iat)) {
      return next(new AppError('token expired', 400));
    }

    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  // verify email
  // create token
  //send to mailId.

  const { email } = req.body;

  if (!req.body.email) {
    next('');
  }

  const user = await User.findOne({ email });

  if (!user) {
    next('user does not exist', 401);
  }
};

const signout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      active: false,
    });

    res.status(204).json({
      message: 'signed out successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

const Me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  const filterObj = (reqBody) => {
    const newReqObj = {};

    const reqArray = Object.keys(reqBody);

    const arr = ['name', 'email', 'photo'];

    arr.forEach((cur) => {
      if (reqArray.includes(cur)) {
        newReqObj[cur] = reqBody[cur];
      }
    });

    return newReqObj;
  };

  try {
    const updatedDetails = await User.findByIdAndUpdate(
      req.user._id,
      filterObj(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      data: {
        status: 'doc updated successfully',
        updatedDetails,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  signout,
  protect,
  forgotPassword,
  Me,
  updateMe,
};
