const express = require('express');
const router = express.Router();

// Question Model
const Question = require('../../models/Question.js');

// @route GET api/search
// desc GET search question
// @access Public
router.get('/', (req, res) => {
  const question = req.query.question;
  const type = req.query.type;
  if(type === 'title') {
    Question.find({
      title: {
        $regex: new RegExp(question)
      }
    }, {}, (err, data) => {
      res.json(data);
    }).limit(10);
  }
  if(type === 'category') {
    Question.find({
      category: {
        $regex: new RegExp(Question)
      }
    }, {}, (err, data) => {
      res.json(data);
    }).limit(10);
  }
  if(type === 'rating') {
    Question.find({
      rating: question
    }, {}, (err, data) => {
      res.json(data)
    }).limit(10);
  }
});


// @route GET api/search/cate
// desc GET search category
// @access Public
router.get('/category/', (req, res) => {
  const cate = req.query.cate;
  Question.find({
    category: {
      $regex: new RegExp(cate)
    }
  }, {}, (err, data) => {
    res.json(data);
  }).limit(10);
});


module.exports = router;
