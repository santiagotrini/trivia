const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.get('/users', (req, res) => {
  res.status(200).json({ msg: 'implementar' });
});

router.get('/user/:id', (req, res) => {

  res.status(200).json({ msg: 'implementar' });
});

router.post('/user', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(err => {
        if (err) throw err;
        res.status(201).json(user);
      });
    });
  });
});

module.exports = router;
