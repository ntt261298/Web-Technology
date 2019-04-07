const express = require('express');
const router = express.Router();

// User Model
const UserSession = require('../../models/UserSession.js');

// @route GET api/acount/logout
// @access Public
router.get('/', (req, res, next) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  //?token=test

  // Verify the token is one of a kind and it's not isDeleted
  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set:{ isDeleted: true }
  }, {new: true}, (err, sessions) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    };
    if(Object.keys(sessions._id).length-1 !== 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      })
    } else {
      return res.send({
        success: true,
        message: 'Good'
      })
    }
  })
})

module.exports = router;
