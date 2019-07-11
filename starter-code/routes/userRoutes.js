const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');

//For passport
const passport = require('passport');

const ensureLogin = require("connect-ensure-login");
//

router.get('/signup', (req, res, next)=>{

    res.render('user-views/signup');
})

// even though these look like the same route, theyre different routes becase one is get and one is post
router.post('/signup', (req, res, next)=>{

    const thePassword = req.body.thePassword;
    const theUsername = req.body.theUsername;

    const salt = bcrypt.genSaltSync(12);
    const hashedPassWord =  bcrypt.hashSync(thePassword, salt);
    console.log("I'm right outside of create user")

    User.create({
        username: theUsername,
        password: hashedPassWord
    })
    .then(()=>{
        console.log('yay, created a new user');
        req.flash('err', 'yay, created a new user');
        res.redirect('/')
    })
    .catch((err)=>{
        next(err);
    })
})


// //What is this again???eyy
// router.get('/login', (req, res, next)=>{
//     if(req.session.errorCount <= 0){
//         req.session.errorMessage = null;
//     }
//     req.session.errorCount -=1;
//     // you can do this in every single route manually, 
//     // or you can make your own middleware function and call that function in all the routes
//     // or you can use flash messages


//     res.render('user-views/login', {error: req.session.errorMessage})
// })

//This isn't working!!!!!!!!!!!
router.get('/login', (req, res, next)=>{
    // console.log(req.flash('message'))
    res.render('user-views/login', {message: res.locals.errors})
})



// router.post('/login', (req, res, next)=>{

//     const password = req.body.thePassword;
//     const username = req.body.theUsername;


// User.findOne({ "username": username })
//   .then(user => {
//       if (!user) {
//           req.session.errorMessage = "sorry, no one with that username found";
//           req.session.errorCount = 1
//           res.redirect('/login');

//       }
//       if (bcrypt.compareSync(password, user.password)) {

//         req.session.currentUser = user;
//         res.redirect('/');

//       } else {

//         req.session.errorMessage = 'wrong password';
//         req.session.errorCount = 1;
//         res.redirect('/login');
//       }
//   })
//   .catch(error => {
//     next(error);
//   })

// })
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));



// router.get('/profile', (req, res, next)=>{

//     if(req.session.currentUser){

//         res.render('user-views/profile', {user: req.session.currentUser})

//     } else {
//         req.session.errorCount = 1;
//         req.session.errorMessage = "Sorry, you must be logged in to use that feature please log in"
//         res.redirect('/login')
//     }
// })
router.get('/profile', ensureLogin.ensureLoggedIn('/login') ,(req, res, next)=>{
    res.render("user-views/profile", {user: req.user});

    // // this is how you can manually add something to req.flash
    // req.flash('error', 'Random Word')
    // res.redirect('/')
  })



// router.post('/logout', (req, res, next)=>{
//     req.session.destroy()
//     res.redirect('/')
// })
router.post('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/login");
  })





module.exports = router;