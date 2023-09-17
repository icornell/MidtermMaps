const express = require('express');
const router  = express.Router();
const { getUsers, userMaps, userLikes } = require('../db/queries/users');
const { addNewMap ,getMapById, getAllMaps } = require('../db/queries/maps');

// /u/map, u/map/:id, u/map/create, u/map/:id/update, u/map/:id/delete

//create a new map
router.post('/create', async (req, res) => {
  try {
    //get user input
    const mapInfo = {
      'user_key': req.session.user_id,
      'name': req.body.name,
      'description': req.body.description
    };

    //add new map to database
    const newMap = await addNewMap.createMap(mapInfo);

    res.redirect('/map/${newMap.id}')
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//view a map
router.get('/:id', (req, res) => {
  try {
    const mapID = req.params.id;
    const map = getMapById(mapID);
    //replace with helper function to get map by id

    if (map) {
      res.redirect('mapView', { map });
      //replace mapView with the html view file name
    } else {
      res.status(404).send("Map not found");
    };
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Server Error")
  }
});

router
  .route('/:id/update')
  .get((req, res) => {
//get map
    const mapID = req.params.id;
    const map = getMapById(mapID);

    const mapInfo = {
      id: req.params.id,
      user_key: req.session.user_id,
      name: ,
      date_created: ,
    };
    res.render('/map/${mapinfo.id}', mapInfo)
  })
  .post((req, res) => {
    const mapID = req.params.id;
    const map = function(mapID);

    res.redirect('/map')
  });


module.exports = router;
