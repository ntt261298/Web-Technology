const express = require('express');
const router = express.Router();

// Answer Model
const Answer = require('../../models/Answer.js');
// User Model
const User =require('../../models/User.js');
// Book Model
const Question =require('../../models/Question.js');

// @route GET api/answer
// desc GET All answer
// @access Public
router.get('/', (req, res) => {
  let allAnswer = [];
  Answer.find()
    .sort({created_at: -1})
    .then(answers => {
      answers.forEach(answer => {
      User.findById(answer.userID)
        .then(user => {
          const resAnswer = answer.toObject();
          resAnswer.name = user.toObject().name;
          allAnswer.push(resAnswer);
          if(allAnswer.length === answers.length) {
            res.json(allAnswer);
          }
        })
    });
  })
});

// @route GET api/answer
// desc GET question answers
// @access Public
router.get('/:id', (req, res) => {
  const questionID = req.params.id;
  let questionAnswers = [];
  Answer.find({questionID})
    .sort({created_at: -1})
    .then(answers => {
      answers.forEach(answer => {
      User.findById(answer.userID)
        .then(user => {
          const resAnswer = answer.toObject();
          resAnswer.name = user.toObject().username;
          questionAnswers.push(resAnswer);
          if(questionAnswers.length === answers.length) {
            res.json(questionAnswers);
          }
        })
    });
  })
});

// @route POST api/answer
// desc Create A Post
// @access Public
router.post('/', (req, res) => {
  console.log(req.body.questionID);
  UserSession.findById(req.body.token)
    .then(Session => {
      const newAnswer = new Answer({
          userID: Session.userId,
          questionID: req.body.questionID,
          answer: req.body.answerText,
          code: req.body.answerCode,
      });
      newAnswer.save()
      .then(answer => {
        Question.findById(req.body.questionID)
          .then(question => {
            console.log(question.answers);
            question.answers++;
            question.save();
          })
        User.findById(Session.userId)
          .then(user => {
            const resAnswer = answer.toObject();
            resAnswer.username = user.toObject().username;
            res.json(resAnswer);
          });
        
      })
      .catch(err => console.log(err));
    })
});


module.exports = router;
