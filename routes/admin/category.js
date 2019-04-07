const express = require('express');
const router = express.Router();

const Cate = require('../../models/Cate.js');

/* GET home page. */
router.get('/', checkAdmin, function(req, res, next) {
  res.redirect('category/listCate');
});

router.get('/listCate', checkAdmin,  function(req, res, next) {
	 Cate.find().then(function(data){
		res.render('category/listCate', {data: data});
	});

});

router.get('/add-cate', checkAdmin, function(req, res, next) {
  res.render('category/addCate', {errors: null});
});


router.post('/add-cate', checkAdmin,  function(req, res, next) {
  //res.render('admin/cate/them');
  req.checkBody('name', 'Name is empty').notEmpty();
  req.checkBody('name', 'Name is from 5 to 32 characters').isLength({min:3, max:32});
  const errors = req.validationErrors();
	if (errors) {
	  res.render('category/addCate',{errors : errors});
	}

	const cate = new Cate({
		name 			: req.body.name,
	});

	cate.save().then(function(){
		req.flash('success_msg', 'Add Successful');
		res.redirect('/admin/category/add-cate');
	});


});


router.get('/:id/update-cate', checkAdmin,  function(req, res, next) {
	Cate.findById(req.params.id, function(err, data){
		res.render('category/updateCate',{ errors: null, data: data});
	});
});

router.post('/:id/update-cate', checkAdmin,  function(req, res, next) {
	req.checkBody('name', 'Name is empty').notEmpty();
  	req.checkBody('name', 'Name is from 5 to 32 characters').isLength({min:3, max:32});
  	const errors = req.validationErrors();
  	if(errors){
  		Cate.findById(req.params.id, function(err, data){
			res.render('category/updateCate',{ errors: errors, data: data});
		});
  	}else{
  		Cate.findById(req.params.id, function(err, data){
			data.name 			= req.body.name;
			data.save();
			req.flash('success_msg', 'Modify Successful');
			res.redirect('/admin/category/'+req.params.id+'/update-cate');
		});
  	}

});

router.get('/:id/delete-cate',  checkAdmin,  function(req, res, next) {

	Cate.findById(req.params.id).remove(function() {
		req.flash('success_msg', 'Delete Successful');
		res.redirect('/admin/category/listCate');
	});
});

function checkAdmin(req, res, next){

    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/login');
    }
}
module.exports = router;
