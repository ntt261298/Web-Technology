const express = require('express');
const router = express.Router();

// Comment Model
const Comment = require('../../models/Comment.js');
// User Model
const User = require('../../models/User.js');
// Answer Model
const Answer = require('../../models/Answer.js');

// @route GET api/comment
// desc GET All comment
// @access Public
router.get('/', (req, res) => {
  let allComment = [];
  Comment.find()
    .sort({createdAt: -1})
    .then(comments => {
      comments.forEach(comment => {
      User.findById(comment.userID)
        .then(user => {
          const resComment = comment.toObject();
          resComment.name = user.toObject().username;
          allComment.push(resComment);
          if(allComment.length === comments.length) {
            res.json(allComment);
          }
        })
    });
  })
});

// @route POST api/comment
// desc Create A Post
// @access Public
router.post('/', (req, res) => {
  console.log(req.body.bookID);
  UserSession.findById(req.body.token)
    .then(Session => {
      try {
        console.log(Session.userId);
        Comment.find({userID: Session.userId, answerID: req.body.answerID}, function(err, comments) {
          if(err) console.log(err);
          comments.forEach(comment => {
            comment.rating = req.body.rating;
            comment.save();
          })
        })
      } catch(e) {
        console.log(e);
      }

      const newComment = new Comment({
          userID: Session.userId,
          answerID: req.body.answerID,
          content: req.body.comment,
          rating: req.body.rating,
      });
      newComment.save()
      .then(comment => {
        User.findById(Session.userId)
          .then(user => {
            const resComment = comment.toObject();
            resComment.name = user.toObject().username;
            res.json(resComment);
          });
        Comment.find({answerID: req.body.answerID})
          .then(comments => {
            let totalRating = 0;
            comments.forEach(comment => {
              totalRating+= parseInt(comment.rating);
            });
            let avgRating = parseInt(totalRating/comments.length);
            console.log(avgRating);
            Answer.findById(req.body.answerID, function(err, answer) {
              if(err) console.log(err);
              answer.rating = avgRating;
              answer.save();
            })
          })
      })
      .catch(err => console.log(err));
    })
});


module.exports = router;
