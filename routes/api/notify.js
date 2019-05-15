const express = require('express');
const router = express.Router();

const UserSession = require('../../models/UserSession.js');
const Question = require('../../models/Question.js');
const Notify = require('../../models/Notify.js');

// @route GET api/questions
// desc GET All questions
// @access Public
router.get('/:token', (req, res) => {
    const token = req.params.token;
    console.log(token);
    UserSession.findById(token)
    .then(session => {
        Notify.find({userID: session.userId})
        .then(notify => {
            res.json(notify);
        })
    })
});

router.post('/', (req, res) => {
    const token = req.body.token;
    console.log('token' + token)
    UserSession.findById(token)
    .then(session => {
        Notify.find({userID: session.userId})
        .then(notify => {
            notify[0].status = false;
            notify[0].questionID = ''
            notify[0].save();
            res.json(notify);
        })
    })
});

module.exports = router;
