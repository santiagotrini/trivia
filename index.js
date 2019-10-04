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
  question: { type: String, required: true }
});

const Question = mongoose.model('Question', QuestionSchema);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// rutas
app.post('/question', (req, res) => {
  let question = new Question({
    question: req.body.question
  });
  question.save(err => {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  Question.find((err, questions) => {
    res.render('index', { questions: questions });
  });
});

// listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
