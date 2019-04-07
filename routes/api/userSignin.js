const express = require('express');
const router = express.Router();

// Item Model
const User = require('../../models/User.js');
const UserSession = require('../../models/UserSession.js');

// @route POST api/acount/signin
// desc Create A Post
// @access Public
router.post('/', (req, res, next) => {
  const { body } = req;
  const { username, password } = body;
  // Check if username or password blank
  if(!username) {
    return res.send({
      success: false,
      message: 'Error: Username cannot be blank'
    })
  };
  if(!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank'
    })
  }
  // Check if username doesn't exist
  User.find({
    username: username
  }, (err, users) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    };
     if (users.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    };
    const user = users[0];
    if(!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    };
    // Otherwise correct user
    const userSession = new UserSession;
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error: Server Error'
        });
      }
      return res.send({
        success: true,
        message: 'Login Successful',
        token: doc._id
      })
    })
  });
});

module.exports = router;
