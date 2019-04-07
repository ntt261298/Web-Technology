const express = require('express');
const router = express.Router();

const Admin = require('../../models/Admin.js');
const flash = require('connect-flash');

const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    str = str.replace(/\./g, "-");
    return str;
}

/* GET home page. */
router.get('/', checkAdmin, function(req, res, next) {
  res.render('main/index');
});

router.get('/login', function(req, res, next) {
  res.render('login/index', {message: req.flash('loginMessage')});
});




router.post('/login',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/admin/login',
                                   failureFlash: true })
);

passport.use('local', new LocalStrategy({
   passReqToCallback : true
 },
   (req, username, password, done) => {
     Admin.findOne({"username": username}).then(((user) => {
       if(!user){
        return done(null, false, req.flash('loginMessage', 'No user found.'));
       }
       if(user.password == password) {;
         return done(null, user);
       }

       else{
         done(null, false, req.flash('loginMessage', 'Wrong password.'));
       }
     }))
}))

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  Admin.findOne({"username": user.username }).then((user, err) => {
    if(err)
      done(err, null);
    done(null, user);
  })
});



router.post('/getUser',checkAdmin, function (req, res) {
    res.json(req.user);
});

router.get('/logout',checkAdmin, function (req, res) {
    req.logout();
    res.redirect('/admin/login');
});


function checkAdmin(req, res, next){
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/login');
    }
}

module.exports = router;
