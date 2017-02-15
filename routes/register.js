var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next){
  res.render('register',
  {title: 'Register your account',
  success: req.session.success,
  errors: req.session.errors});
})

router.post('/sub',function(req, res, next) {
  req.check('name','invalid name < 4').isLength({min: 4});
  req.check('lstname','invalid last name < 4').isLength({min: 4});
  req.check('email','invalid email address').isEmail();
  req.check('pw','password is < 8').isLength({min: 8});
  req.check('pw','confirmation password is invalid').equals(req.body.pwconf);

  var errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
  }else{
    req.session.success = true;
  }
  res.redirect('/register');
  console.log(req.body, req.session.errors, req.session.success);
  // res.render('register',{title: 'Register your account'});
});



module.exports = router;
