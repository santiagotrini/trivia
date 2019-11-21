const express = require('express');
const router = express.Router();

router.get('/answers', (req, res) => {
  res.status(200).json({ msg: 'implementar' });
});

router.get('/answer/:id', (req, res) => {
  res.status(200).json({ msg: 'implementar' });
});

router.post('/answer', (req, res) => {
  res.status(201).json({ msg: 'implementar' });
});

module.exports = router;
