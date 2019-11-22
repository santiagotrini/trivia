const express = require('express');
const Answer  = require('../../models/Answer');
const router  = express.Router();

router.get('/answers', (req, res) => {
  Answer.find().exec((err, answers) => {
    if (err) throw err;
    res.status(200).json(answers);
  });
});

router.get('/answer/:id', (req, res) => {
  Answer.findById(req.params.id).exec((err, answer) => {
    if (err) throw err;
    res.status(200).json(answer);
  });
});

router.delete('/answer/:id', (req, res) => {
  Answer.findByIdAndRemove(req.params.id).exec(err => {
    if (err) throw err;
    res.status(200).json({ message: 'answer deleted' });
  });
});

router.post('/answer', (req, res) => {
  res.status(201).json({ msg: 'implementar' });
});

module.exports = router;
