const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

//view a map

router.get('map/:id', (req, res) => {
  try {
    const mapID = req.params.id;
    //const map = mapquerie(mapID);
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

module.exports = router;
