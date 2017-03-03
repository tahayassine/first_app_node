var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
	req.check('name','invalid name < 4').notEmpty().isLength({min: 4});
	req.check('email','invalid email address').notEmpty().isEmail();
	req.check('password','password is < 8').notEmpty().isLength({min: 8});
	req.check('password','confirmation password is invalid').equals(req.body.pwconf);

	var errors = req.validationErrors();
	if(errors){
	    var messages = [];
	    errors.forEach( function(error) {
	    	messages.push(error.msg);
	    });
	    return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, function(err, user) {
		if (err){
			done(err);
		}
		if (user){
			console.log('user existe!!!!!');
			return done(null, false, {message: 'Email is alredy useed'});
		}
		var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.body.name;
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
	req.check('email','invalid email address.').notEmpty();
	req.check('password','password is < 8.').notEmpty();

	var errors = req.validationErrors();
	if(errors){
	    var messages = [];
	    errors.forEach( function(error) {
	    	messages.push(error.msg);
	    });
	    return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, function(err, user) {
		if (err){
			done(err);
		} if (!user){
			return done(null, false, {message: 'No user found.'});
		} if (!user.validPassword(password)){
			return done (null, false, { message: 'Wrong password.'});
		}
	 	done(null, user);
        });
}));