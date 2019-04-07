const express = require('express');
const router = express.Router();

// UserSession Model
const UserSession = require('../../models/UserSession.js');
// User Model
const User = require('../../models/User.js');

// @route GET api/user/infor
// desc GET All userItem
// @access Public
router.get('/infor', (req, res) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  //?token=test

  UserSession.findById(token)
    .then(session => {
      User.findById(session.userId)
        .then(user => res.json(user))
    })
});
// @route POST api/user/infor
// desc POST user
// @access Public
router.post('/infor', (req, res) => {
  const token = req.body.token;

  if(req.body.pwd || req.body.newpwd || req.body.repwd) {
    if(!req.body.pwd) {
      return res.send({
        success: false,
        message: 'Password is empty'
      })
    };
    if(!req.body.newpwd) {
      return res.send({
        success: false,
        message: 'New password is empty'
      })
    };
    if(!req.body.repwd) {
      return res.send({
        success: false,
        message: 'Confirm password is empty'
      })
    };
  };
  if(req.body.newpwd !== req.body.repwd){
    return res.send({
      success: false,
      message: 'Wrong confirm password'
    })
  }
  UserSession.findById(token)
    .then(session => {
      User.findById(session.userId)
        .then(user => {
          if(!user.validPassword(req.body.pwd) && req.body.pwd) {
            return res.send({
              success: false,
              message: 'Wrong password'
            });
          }
          if(req.body.name)
            user.name = req.body.name;
          if(req.body.phone)
            user.phoneNumber = req.body.phone;
          if(req.body.gender)
            user.gender = req.body.gender;
          if(req.body.address)
            user.address = req.body.address;
          if(req.body.birthday !== '__')
            user.birthday = req.body.birthday;
          if(req.body.password)
            user.password = user.generateHash(req.body.newpwd);
          user.save((err, user) => {
            if(err) {
              return res.send({
                success: false,
                message: 'Server Error'
              })
            };
            return res.send({
              success: true,
              message: 'Successful'
            })
          })
        })
    })
});
// @route GET api/user/history
// desc GET All userItem
// @access Public
// router.get('/history', (req, res) => {
//   // Get the token
//   const { query } = req;
//   const { token } = query;
//   //?token=test

//   UserSession.findById(token)
//     .then(session => {
//       Transaction.find({ 'usernameID': session.userId })
//         .then(transactions => res.json(transactions))
//     })
// });

module.exports = router;
