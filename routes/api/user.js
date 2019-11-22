const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();
const User    = require('../../models/User');

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    if (err) throw err;
    res.status(200).json(users);
  });
});

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) throw err;
    res.status(200).json(user);
  });
});

router.delete('/user/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).exec(err => {
    if (err) throw err;
    res.status(200).json({ message: 'user deleted' });
  });
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
