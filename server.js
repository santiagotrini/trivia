// dependencias
const express  = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session  = require('express-session');
const bcrypt   = require('bcrypt');

// config
const port = process.env.PORT        || 3000;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/trivia';

// instancia de app
const app = express();

// conectarse a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));

// passport config
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) throw err;
      if (!res) return done(null, false);
      else return done(null, user);
    });
  });
}));
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});
// fin config passport

// middleware
app.use(session({
  secret: 'app secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// config de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// routers
const indexRouter    = require('./routes/index');
const userRouter     = require('./routes/api/user');
const questionRouter = require('./routes/api/question');
const answerRouter   = require('./routes/api/answer');

app.use('/', indexRouter);
app.use('/api', userRouter);
app.use('/api', questionRouter);
app.use('/api', answerRouter);

// listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
