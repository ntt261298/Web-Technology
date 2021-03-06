const express = require('express');
const router = express.Router();

// Answer Model
const Answer = require('../../models/Answer.js');
// User Model
const User =require('../../models/User.js');
// Book Model
const Question =require('../../models/Question.js');
// Notify Model
const Notify = require('../../models/Notify.js');

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
  Answer.find({questionID: questionID})
    .sort({created_at: -1})
    .then(answers => {
      console.log(answers);
      if(!answers.length) {
        console.log(answers);
        res.json(answers);
        return;
      }
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
          rating: req.body.rating,
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
          Answer.find({questionID: req.body.questionID})
          .then(answers => {
            let totalRating = 0;
            answers.forEach(answer => {
              totalRating+= parseInt(answer.rating);
            });
            let avg = totalRating/answers.length;
            let avgRating = Math.round(avg * 100) / 100;
            console.log(avgRating);
            Question.findById(req.body.questionID, function(err, question) {
              if(err) console.log(err);
              question.rating = avgRating;
              question.save();
              
              Notify.find({userID: question.userId})
                .then(notify => {
                  if(notify[0]) {
                    notify[0].status = true;
                    notify[0].questionID = question._id;
                    notify[0].userID = question.userId;
                    console.log(notify[0]);
                    notify[0].save();
                    return;
                  };
                  let newNotify = new Notify({
                    status: true,
                    questionID: question._id,
                    userID: question.userId,
                  });
                  newNotify.save();
                })
            })
})
      })
      .catch(err => console.log(err));
    })
});


module.exports = router;
