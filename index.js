// dependencias
const express  = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session  = require('express-session');
const bcrypt   = require('bcrypt');

// config
const port = process.env.PORT        || 3000;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/trivia';

// objeto app
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

// schema y modelo de pregunta
const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
});

const Question = mongoose.model('Question', QuestionSchema);

// schema y modelo de respuesta
const AnswerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isRight: { type: Boolean, default: false },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

const Answer = mongoose.model('Answer', AnswerSchema);

// schema y modelo de usuario
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', UserSchema);


// passport config
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



// middleware
app.use(session({
  secret: 'app secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// config de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// inventadisima esta ruta
app.get('/newuser', (req, res, next) => {
  const user = new User({
    username: 'blanco',
    password: '1234'
  });
  // hashear password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(err => {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  });
});

// rutas
app.post('/question', (req, res) => {
  let question = new Question({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.question
  });
  let answerA = new Answer({
    title: req.body.answerA,
    isRight: req.body.checkboxA,
    question: question._id
  });
  let answerB = new Answer({
    title: req.body.answerB,
    isRight: req.body.checkboxB,
    question: question._id
  });
  let answerC = new Answer({
    title: req.body.answerC,
    isRight: req.body.checkboxC,
    question: question._id
  });
  let answerD = new Answer({
    title: req.body.answerD,
    isRight: req.body.checkboxD,
    question: question._id
  });
  question.answers.push(answerA);
  question.answers.push(answerB);
  question.answers.push(answerC);
  question.answers.push(answerD);
  question.save(err => {
    answerA.save();
    answerB.save();
    answerC.save();
    answerD.save();
    res.redirect('/');
  });
});

/*
app.get('/', (req, res) => {
  Question.find().populate('answers').exec((err, questions) => {
    res.render('index', { questions: questions, user: req.user });
  });
});
*/

app.get('/', (req, res) => {
  res.render('index');
});

// ruta para signup
app.get('/signup', (req, res, next) => {
  res.render('signup');
});

app.post('/signup', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  // hashear password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(err => {
        if (err) return next(err);
        // res.status(201).json(user);
        res.redirect('/');
      });
    });
  });
});

// ruta para logearse
app.post('/login',
  passport.authenticate('local', { failureRedirect:
  '/' }),
  (req, res, next) => {
    res.redirect('/');
});

// ruta para logout
app.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
});

// para testear nomas
app.get('/api/questions', (req, res) => {
  Question.find().populate('answers').exec((err, questions) => {
    res.status(200).json(questions);
  });
});

// listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
