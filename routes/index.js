const express = require('express');
const router = express.Router();
const passport = require('passport');

// ruta para logearse
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login');
});

// ruta para registrarse
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(err => {
        if (err) throw err;
        res.redirect('/');
      });
    });
  });
});

// ruta para logout
router.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

module.exports = router;
