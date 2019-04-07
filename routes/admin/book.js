const express = require('express');
const router = express.Router();
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
  }
});

const upload = multer({ storage: storage });

const Cate = require('../../models/Cate.js');
const Book = require('../../models/Question.js');

/* GET home page. */
router.get('/', checkAdmin, function (req, res) {
	res.redirect('product/booklist')
});

router.get('/booklist', checkAdmin, function (req, res) {

	Book.find().then(function(pro){
		res.render('product/booklist', {product: pro});
	});
});

router.get('/add-product', checkAdmin, function (req, res) {
	Cate.find().then(function(cate){
		res.render('product/addBook',{errors: null, cate: cate});
	});
});

const cpUpload = upload.fields([{ name: 'bookimg', maxCount: 1 }, { name: 'contentimg', maxCount: 1 }]);
router.post('/add-product', checkAdmin, cpUpload, function (req, res) {
	req.checkBody('name', 'Name is empty').notEmpty();
	req.checkBody('author', 'Author is empty').notEmpty();
  req.checkBody('company', 'Company is empty').notEmpty();
	req.checkBody('price', 'Price must be a number').isInt();
	req.checkBody('des', 'Description is empty').notEmpty();
	console.log(req.files.bookimg[0].filename);
  const errors = req.validationErrors();
	if (errors) {
		const file1 = './public/uploads/' + req.files.bookimg[0].filename;
    const file2 = './public/uploads/' + req.files.contentimg[0].filename;
		  const fs = require('fs');
			fs.unlink(file1, function(e){
				if(e) throw e;
			});
      fs.unlink(file2, function(e){
				if(e) throw e;
			});
  		Cate.find().then(function(cate){
			res.render('product/addBook',{errors: errors, cate: cate});
		});
	}else{
		const book = new Book({
			name: req.body.name,
			bookImage: req.files.bookimg[0].filename,
      contentImage: req.files.contentimg[0].filename,
			category: req.body.cate,
			des: req.body.des,
			price: req.body.price,
      author: req.body.author,
			pagesNumber: req.body.pagesNumber,
      company: req.body.company,
      videoId: req.body.videoId
		});

		book.save().then(function(){
			req.flash('success_msg', 'Add Successful');
			res.redirect('/admin/product/add-product');
		});
  }
});

router.get('/:id/update-product', function (req, res) {
	Book.findById(req.params.id).then(function(data){
		Cate.find().then(function(cate){
			res.render('product/update',{errors: null, cate: cate, product: data});
		});
	});

});

router.post('/:id/update-product',  cpUpload, function (req, res) {
  req.checkBody('name', 'Name is empty').notEmpty();
	req.checkBody('author', 'Author is empty').notEmpty();
  req.checkBody('company', 'Company is empty').notEmpty();
	req.checkBody('price', 'Price must be a number').isInt();
	req.checkBody('des', 'Description is empty').notEmpty();

  const errors = req.validationErrors();
	if (errors) {
    const file1 = './public/uploads/' + req.files.bookimg[0].filename;
    const file2 = './public/uploads/' + req.files.contentimg[0].filename;
		  const fs = require('fs');
			fs.unlink(file1, function(e){
				if(e) throw e;
			});
      fs.unlink(file2, function(e){
				if(e) throw e;
			});
  		Cate.find().then(function(cate){
			res.render('product/addBook',{errors: errors, cate: cate});
		});
	}else{
		Book.findOne({ _id: req.params.id},  function(err, data){
			data.name = req.body.name;
			data.bookImage = req.files.bookimg[0].filename;
      data.contentImage = req.files.contentimg[0].filename;
			data.category = req.body.cate;
			data.des = req.body.des;
			data.price = req.body.price;
			data.author = req.body.author;
      data.pagesNumber = req.body.pagesNumber;
      data.company = req.body.company
      data.videoId = req.body.videoId

			data.save();
				req.flash('success_msg', 'Modify Successful');
				res.redirect('update-product');
			//});


		});

	}

});

router.get('/:id/delete-product', checkAdmin,  function (req, res) {
	// Product.findById(req.params.id).remove(function() {
	// 	console.log(daa);
	// 	req.flash('success_msg', 'Đã Xoá Thành Công');
	// 	res.redirect('/admin/product/danh-sach.html');
	// });

	Book.findById(req.params.id, function(err, data){
		const file1 = './public/uploads/' + data.bookImage;
    const file2 = './pubic/uploads/' + data.contentImage;
		const fs = require('fs');
		fs.unlink(file1, function(e){
			if(e) throw e;
		 });
     fs.unlink(file2, function(e){
 			if(e) throw e;
 		 });
		data.remove(function(){
			req.flash('success_msg', 'Delete Successful');
			res.redirect('product/booklist');
		})
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
