const express = require('express');
const router = express.Router();

const Transaction = require('../../models/Transaction.js');


router.get('/', checkAdmin, function(req, res, next) {
  res.redirect('/cart/view');
});

router.get('/listCart', checkAdmin, function(req, res, next) {
	Transaction.find().then(function(data){
		 res.render('cart/listCart', {data: data});
	});

});


router.get('/:id/view', checkAdmin, function(req, res, next) {
 	const id = req.params.id;
 	Transaction.findById(id).then(function(data){
		 res.render('cart/view', {cart: data});
	});
});

router.get('/:id/checkout-cart',checkAdmin, function(req, res, next) {
 	const id = req.params.id;
 	Transaction.findById(id, function(err, data){
 		data.save();
 		req.flash('success_msg', 'Add Successful');
		res.redirect('/admin/cart/'+id+'/view');

 	});
});

router.get('/:id/verify-cart',checkAdmin, function(req, res, next) {
 	const id = req.params.id;
 	Transaction.findById(id, function(err, data){
    data.status = "Delivered";
 		data.save();
 		req.flash('success_msg', 'Add Successful');
		res.redirect('/admin/cart/'+id+'/view');

 	});
});


router.get('/:id/delete-cart', checkAdmin, function(req, res, next) {
 	const id = req.params.id;
 	Transaction.findOneAndRemove({_id: id}, function(err, offer){
 		req.flash('success_msg', 'Delete Successful');
		res.redirect('/admin/cart/listCart');
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
