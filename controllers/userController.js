const fs = require('fs');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  // query.sort().select().skip().limit()

  // SEND RESPONSE
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: users.length,
    // requestedAt: req.requestTime,
    // results: users.length, // (array) client know about the data it is receiving
    data: {
      users, //can be x
    },
  });
});
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
