const express = require('express');
const multer = require('multer');
const router = express.Router();

// Upload photo
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === "image/gif") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const UserSession = require('../../models/UserSession.js');
const Question = require('../../models/Question.js');
const Cate = require('../../models/Cate.js');

// @route GET api/questions
// desc GET All questions
// @access Public
router.get('/', (req, res) => {
  Question.find()
    .then(questions => res.json(questions))
});

// @route POST api/questions
// desc POST a question
// @access Public
router.post('/', (req, res) => {
  UserSession.findById(req.body.token)
    .then(session => {
      const question = new Question({
        userId: session.userId,
        title: req.body.title,
        problem: req.body.problem,
        category: req.body.category,
        code: req.body.code,
      });
      question.save()
        .then(question => {
          res.send({
            success: true,
            message: 'Ask question successfully'
          })
        })
        .catch(err => {
          res.send({
            success: false,
            message: err
          })
        })
    });
});

// @route GET api/questions/cate
// desc GET All cates
// @access Public
router.get('/cate', (req, res) => {
  Cate.find()
    .then(cates => res.json(cates))
});

// @route GET api/questions/detail/:id
// desc GET detail question
// @access Public
router.get('/detail/:id', (req, res) => {
  const question = req.params.id;
  Question.findById(question)
    .then(question => res.json(question))
});

router.post('/addView', (req, res) => {
  const question = req.body.id;
  Question.findById(question)
    .then(question => {
      question.views++;
      question.save();
    })
});


module.exports = router;
