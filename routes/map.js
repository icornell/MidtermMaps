const express = require('express');
const router  = express.Router();
const { getUsers, userMaps, userLikes } = require('../db/queries/users');
const { addNewMap ,getMapById, getAllMaps } = require('../db/queries/maps');

// /u/map, u/map/:id, u/map/create, u/map/:id/update, u/map/:id/delete

//create a new map
router
  .route('/create')
  .get((req, res) => {
    res.render('createMap') //render html map creation form
  })
  .post(async (req, res) => {
    try {
      //get user input
      const mapInfo = {
        'user_key': req.session.user_id,
        'name': req.body.name,
        'date_created': new Date().toLocaleDateString('en_CA'),
      };

      //add new map to database
      const newMap = await addNewMap(mapInfo);

      res.redirect(`/map/${newMap.id}`)
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

//view a map
router.get('/:maps_id', async (req, res) => {
  try {
    const mapID = req.params.maps_id;
    const map = await getMapById(mapID);

    if (map) {
      res.render('mapView', { map });
      //replace mapView with the html view file name
    } else {
      res.status(404).send("Map not found");
    };
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error")
  }
});

//edit a map
// router
//   .route('/:maps_id/update')
//   .get((req, res) => {
//     const mapID = req.params.maps_id;
//     const map = getMapById(mapID);

//     const mapInfo = {
//       id: req.params.maps_id,
//       user_key: req.session.user_id,
//       name: req.body.name,
//       date_created: new Date().toLocaleDateString('en_CA'),
//     };
//     res.render('/map/${mapinfo.maps_id}', mapInfo)
//   })
//   .post((req, res) => {
//     const mapID = req.params.maps_id;
//     const map = function(mapID);

//     res.redirect('/map')
//   });


module.exports = router;
