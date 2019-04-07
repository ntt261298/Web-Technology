// const express = require('express');
// const router = express.Router();

// // Comment Model
// const Comment = require('../../models/Comment.js');
// // User Model
// const User =require('../../models/User.js');
// // Book Model
// const Book =require('../../models/Books.js');

// // @route GET api/comment
// // desc GET All comment
// // @access Public
// router.get('/', (req, res) => {
//   let allComment = [];
//   Comment.find()
//     .sort({date: -1})
//     .then(comments => {
//       comments.forEach(comment => {
//       User.findById(comment.userID)
//         .then(user => {
//           const resComment = comment.toObject();
//           resComment.name = user.toObject().name;
//           allComment.push(resComment);
//           if(allComment.length === comments.length) {
//             res.json(allComment);
//           }
//         })
//     });
//   })
// });

// // @route POST api/comment
// // desc Create A Post
// // @access Public
// router.post('/', (req, res) => {
//   console.log(req.body.bookID);
//   UserSession.findById(req.body.token)
//     .then(Session => {
//       try {
//         console.log(Session.userId);
//         Comment.find({userID: Session.userId, bookID: req.body.bookID}, function(err, comments) {
//           if(err) console.log(err);
//           comments.forEach(comment => {
//             comment.rating = req.body.rating;
//             comment.save();
//           })
//         })
//       } catch(e) {
//         console.log(e);
//       }

//       const newComment = new Comment({
//           userID: Session.userId,
//           bookID: req.body.bookID,
//           comment: req.body.comment,
//           rating: req.body.rating,
//       });
//       newComment.save()
//       .then(comment => {
//         User.findById(Session.userId)
//           .then(user => {
//             const resComment = comment.toObject();
//             resComment.name = user.toObject().name;
//             res.json(resComment);
//           });
//         Comment.find({bookID: req.body.bookID})
//           .then(comments => {
//             let totalRating = 0;
//             comments.forEach(comment => {
//               totalRating+= parseInt(comment.rating);
//             });
//             let avgRating = parseInt(totalRating/comments.length);
//             console.log(avgRating);
//             Book.findById(req.body.bookID, function(err, book) {
//               if(err) console.log(err);
//               book.rating = avgRating;
//               book.save();
//             })
//           })
//       })
//       .catch(err => console.log(err));
//     })
// });


// module.exports = router;
