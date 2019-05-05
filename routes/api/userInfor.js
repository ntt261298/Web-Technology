const express = require('express');
const router = express.Router();

const UserSession = require('../../models/UserSession.js');
const User = require('../../models/User.js');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');


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

// @route GET api/user/history/question
// desc GET All userQuestion
// @access Public
router.get('/history/question', (req, res) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  //?token=test

  UserSession.findById(token)
    .then(session => {
      Question.find({ 'userId': session.userId })
        .then(questions => res.json(questions))
    })
});

// @route GET api/user/history/answer
// desc GET All userAnswer
// @access Public
router.get('/history/answer', (req, res) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  //?token=test

  UserSession.findById(token)
    .then(session => {
      Answer.find({ 'userId': session.userId })
        .then(answers => res.json(answers))
    })
});

module.exports = router;
