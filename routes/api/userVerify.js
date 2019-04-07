const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');

// User Model
const UserSession = require('../../models/UserSession.js');
const User = require('../../models/User.js');
// @route GET api/acount/verify
// @access Public
router.get('/', (req, res, next) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  //?token=test

  // Verify the token is one of a kind and it's not isDeleted
  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    };

    if(sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      })
    } else {
      User.findById(sessions[0].userId)
        .then(user => {
          return res.send({
            success: true,
            name: user.name,
            message: 'Good'
          })
        })
    }
  })
})


router.post('/forgot', function(req, res, next) {
  console.log(req.body.email);
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return res.send({
            success: false,
            message: 'No account with that email address exists.'
          });
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ntt261298@gmail.com',
            pass: '26121998'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'ntt261298@gmail.com',
        subject: 'NineBook Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:3000/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
        res.send({
          success: true,
          message: 'An e-mail has been sent to ' + user.email
        })
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
});

router.post('/reset', function(req, res) {
  const password = req.body.password;
  const repassword = req.body.repassword;
  if(password !== repassword) {
    return res.send({
      success: false,
      resetErr: 'Wrong repassword'
    })
  };
  const date = new Date().toISOString();
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: date } }, function(err, user) {
    console.log(user);
    if (!user) {
      return res.send({
        success: false,
        resetErr: 'Password reset token is invalid or has expired.'
      });
    }
    user.password = user.generateHash(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save()
      .then(user => {
        return res.send({
          success: true,
          resetErr:'Changed Successful'
        })
      })
      .catch(err => console.log(err));
  });
})

module.exports = router;
