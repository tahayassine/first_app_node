var express = require('express');
var router = express.Router();

/* GET users listing. */
data = [
  {userName : "jack",
    age     : 45}
];
router.get('/:id', function(req, res, next){
  var usersId = req.params.id;
  if (data[usersId])
  {
    res.render('profil',{user: data[usersId].userName});
  }else {
    res.redirect('/users');
  }
})
.get('/', function(req, res, next){
  res.render('connection', {title:"connection"});
});

module.exports = router;
