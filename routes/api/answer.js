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
    .sort({date: -1})
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

// @route POST api/answer
// desc Create A Post
// @access Public
router.post('/', (req, res) => {
  console.log(req.body.questionID);
  UserSession.findById(req.body.token)
    .then(Session => {
      try {
        console.log(Session.userId);
        Answer.find({userID: Session.userId, questionID: req.body.questionID}, function(err, answers) {
          if(err) console.log(err);
          answers.forEach(answer => {
            answer.rating = req.body.rating;
            answer.save();
          })
        })
      } catch(e) {
        console.log(e);
      }

      const newAnswer = new Answer({
          userID: Session.userId,
          questionID: req.body.questionID,
          answer: req.body.answer,
          rating: req.body.rating,
      });
      newAnswer.save()
      .then(answer => {
        User.findById(Session.userId)
          .then(user => {
            const resAnswer = answer.toObject();
            resAnswer.name = user.toObject().name;
            res.json(resAnswer);
          });
        Answer.find({questionID: req.body.questionID})
          .then(answers => {
            let totalRating = 0;
            answers.forEach(answer => {
              totalRating+= parseInt(answer.rating);
            });
            let avgRating = parseInt(totalRating/answers.length);
            console.log(avgRating);
            Question.findById(req.body.questionID, function(err, question) {
              if(err) console.log(err);
              question.rating = avgRating;
              question.save();
            })
          })
      })
      .catch(err => console.log(err));
    })
});


module.exports = router;
