// dependencias
const express = require('express');
const mongoose = require('mongoose');

// config
const port = process.env.PORT        || 3000;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/trivia';

// objeto app
const app = express();

// conectarse a la base de datos
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

const AnswerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isRight: { type: Boolean, default: false },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

const Answer = mongoose.model('Answer', AnswerSchema);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config de vistas
app.set('view engine', 'pug');
app.set('views', './views');

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

app.get('/', (req, res) => {
  Question.find().populate('answers').exec((err, questions) => {
    res.render('index', { questions: questions });
  });
});

// para testear nomas
app.get('/api/questions', (req, res) => {
  Question.find().populate('answers').exec((err, questions) => {
    res.json(questions);
  });
});

// listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
