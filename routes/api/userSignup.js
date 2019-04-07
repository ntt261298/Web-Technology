const express = require('express');
const router = express.Router();

// Item Model
const User = require('../../models/User.js');

// @route POST api/acount/signup
// desc Create A Post
// @access Public
router.post('/', (req, res) => {
  const { body } = req;
  console.log(req.body);
  const { username, name, email, password, repassword } = body;
  // Check if username or password blank
  if(!username) {
    return res.send({
      success: false,
      message: 'Error: Username cannot be blank'
    })
  };
  if(!name) {
    return res.send({
      success: false,
      message: 'Error: Name cannot be blank'
    })
  };
  if(!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank'
    })
  };
  if(!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank'
    })
  } else if(password !== repassword) {
      return res.send({
        success: false,
        message: 'Error: Wrong confirm password'
      })
    }

  // Check if username doesn't exist
  User.find({
    username: username
  }, (err, previousUser) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if (previousUser.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Username already exist '
      });
    }
    const newUser = new User();
    newUser.username = username;
    newUser.name = name;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save()
    .then(user => res.send({
      success: true,
      message: 'Signup Successful'
    }))
    .catch(err => console.log(err));
  });
});

module.exports = router;
