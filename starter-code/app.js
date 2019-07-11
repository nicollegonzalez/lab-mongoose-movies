require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
// const MongoStore   = require("connect-mongo")(session);
const User         = require('./models/User');

const session = require("express-session");
const bcrypt = require("bcryptjs");
//for passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//for flaash
const flash = require("connect-flash");


mongoose
  .connect('mongodb://localhost/lab-mongoose-movies', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// /*Session*/

// app.use(session({
//   secret: "Shhhh-super-secret-thing",
//   cookie: { maxAge: 60000 },
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 
//   })
// }));
//use the lines below rather than above.
app.use(session({
  secret: "shhhhh-super-secret",
  resave: true,
  saveUninitialized: true
}));

//need this when using passport
app.use(passport.initialize());
app.use(passport.session());





passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

//If using flash for error messaage
app.use(flash());

// with passport you dont get to choose it looks for req.body.username 
// and req.body.password
// choose your name="" in the hbs file accordingly
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Sorry we couldn't find that username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Password not correct for that username" });
    }

    return next(null, user);
  });
}));


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.err         = req.flash('message')
  res.locals.yay         =req.flash('success')
  next();
});




//Routes
const index = require('./routes/index');
app.use('/', index);

const celebrityRoutesVar = require('./routes/celebrityRoutes');
app.use('/', celebrityRoutesVar);

const movieRoutes = require('./routes/movieRoutes');
app.use('/', movieRoutes);

// const usrrts = require('./routes/userRoutes');
// app.use('/', usrrts);
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

const createNewCelebrityListRoutes = require('./routes/createNewCelebrityListRoutes');
app.use('/',createNewCelebrityListRoutes);



module.exports = app;
