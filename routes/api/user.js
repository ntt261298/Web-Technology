const express = require('express');
const router = express.Router();

const User = require('../../models/User.js');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');
const Comment = require('../../models/Comment');

const ratingAvg = (list) => {
  let rating = 0;
  for(let i = 0; i < list.length; i++) {
    rating+=list[i].rating;
    console.log(list[i].rating);

  };
  const avg = rating/list.length;
  return Math.round(avg * 100) / 100;
}

// @route GET api/viewuser/:id
// desc GET user
// @access Public
router.get('/:id', (req, res) => {
  // Get the token
  const id = req.params.id;
  //?id=test
  User.findById(id)
    .then(async user => {
      const questions = await Question.find({userId: user._id});
      const answers = await Answer.find({userID: user._id});
      const comments = await Comment.find({userID: user._id});
      const infor = {
        ...user,
        question: questions.length,
        answer: answers.length,
        comment: comments.length,
        rating: (ratingAvg(answers) + ratingAvg(questions))/2,
      };
      res.json(infor);
    });
});

module.exports = router;
