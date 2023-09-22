const express = require('express');
const router  = express.Router();

app.get('/', (req, res) => {
  const user = null;
  const templateVars = { user };
  res.render('index', templateVars);
});

app.get('/search', (req, res) => {
  const user = null;
  const templateVars = { user };
  res.render('search', templateVars);
});

app.get('/users', (req, res) => {
  const user = null;
  const templateVars = { user };
  res.render('users', templateVars);
});

app.get('/about', (req, res) => {
  const user = null;
  const templateVars = { user };
  res.render('about', templateVars);
});

module.exports = router;
