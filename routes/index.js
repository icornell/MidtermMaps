const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const getAllMaps = require('../db/queries/maps');

//homepage display maps

router.get('/', (req, res) => {
  res.render('index', getAllMaps());
});

module.exports = router;
