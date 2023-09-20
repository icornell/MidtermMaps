const express = require('express');
const router  = express.Router();
const { getUsers, userMaps, userLikes } = require('../db/queries/users');
const { addNewMap ,getMapById, getAllMaps } = require('../db/queries/maps');

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
app.get('/login/:user_id', (req, res) => {
res.cookie('user_id', userId); //set cookie w cookie parser
res.redirect('/');
});

app.listen(8080)


module.exports = router;
