const express = require('express');
const router = express.Router();
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');

router.get('/questions', (req, res) => {
  Question.find().populate('answers').exec((err, questions) => {
    res.status(200).json(questions);
  });
});

router.get('/question/:id', (req, res) => {
  res.status(200).json({ msg: 'implementar' });
});

router.post('/question', (req, res) => {
  const question = new Question({
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
    res.status(201).json(question);
  });
});

module.exports = router;
