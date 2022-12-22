var passport = require('passport');
var User = require('../src/models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.sign-up', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    isAdminField: 'isAdmin',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, { message: "Email is already in use." });
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
  

        if(req.body.isAdminField){

            newUser.isAdminField = true;
        } else{
            newUser.isAdminField = false;
        }
        newUser.save(function (err, result) {
            if (err) {
                done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.sign-in', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "No user found" });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: "Wrong password" });
        }
        user["email"]=email;
        return done(null, user);
    });
})); 
