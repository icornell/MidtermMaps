const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

//create a new map

router.post('map/new', (req, res) => {
  const templateVars = {
    user: req.session.user_id,
  };
  res.render('map_new', templateVars)
});

module.exports = router;
