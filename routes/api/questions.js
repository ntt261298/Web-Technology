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

// Item Model
const Question = require('../../models/Question.js');
const Cate = require('../../models/Cate.js');

// @route GET api/questions
// desc GET All questions
// @access Public
router.get('/', (req, res) => {
  Question.find()
    .then(questions => res.json(questions))
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
    .then(question => {
      Cate.findById(question.cateId)
        .then(cate => {
          question.cate = cate.name;
          console.log(cate.name);
          res.json(question);
        })
    })
});


module.exports = router;
