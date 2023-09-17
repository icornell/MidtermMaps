const express = require('express');
const router  = express.Router();
const { getUsers, userMaps, userLikes } = require('../db/queries/users');

//view profile, show maps and likes

router.get('/u/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const templateVars = {
      maps: userMaps(userId),
      likes: userLikes(userId)
    }
    res.render('users', templateVars)
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
