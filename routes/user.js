const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')
const { getUsers, getUser, userMaps, userLikes } = require('../db/queries/users');
const { addNewMap ,getMapById, getAllMaps, getMarkers, addNewMapPoint } = require('../db/queries/maps');
router.use(cookieParser());

//view profile, show maps and likes
router.get('/:user_id', async (req, res) => {
  try {
    const userId = req.cookies.user_id;
    const user = await getUser(userId);

    const maps = await userMaps(userId)
    //iterate maps getting markers for each
    const mapMarkers = await Promise.all(
      maps.map(async (map) => {
        const markers = await getMarkers(map.id);
        return { map, markers };
      })
    );

    const likes = await userLikes(userId);
    //iterate maps getting markers for each
    const likeMarkers = await Promise.all(
      likes.map(async (map) => {
        const markers = await getMarkers(map.id);
        return { map, markers };
      })
    );

    res.render('users', { user, mapMarkers, likeMarkers } );
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//set user login cookie
router.get('/login/:user_id', (req, res) => {
  const userId = '2';
  res.cookie('user_id', userId); //set cookie w cookie parser
  res.redirect(`/u/${userId}`);
});

module.exports = router;
