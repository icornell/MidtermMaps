const express = require('express');
const router  = express.Router();
const { getUsers, userMaps, userLikes } = require('/Users/lumorris/Documents/Lighthouse/MidtermMaps/db/queries/maps');

//view profile, show maps and likes
router.get('/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
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

//set user login cookie
router.get('/login/:user_id', (req, res) => {
  const userId = req.params.user_id;
  res.cookie('user_id', userId); //set cookie w cookie parser
  res.render('users', { userId });
});

module.exports = router;
