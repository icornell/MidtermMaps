const express = require('express');
const router  = express.Router();
const { getUsers, userMaps, userLikes } = require('../db/queries/users');
const { addNewMap ,getAllMaps } = require('../db/queries/maps');

//homepage display maps
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
