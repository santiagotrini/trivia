const express = require('express');
const router = express.Router();
const passport = require('passport');

// ruta para logearse
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
});

// ruta para logout
router.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
