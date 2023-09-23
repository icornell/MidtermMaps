const db = require('../connection');

//retrieve all maps from database
const getAllMaps = () => {
  const allMapsQuery = 'SELECT * FROM maps;';
  return db.query(allMapsQuery)
    .then((allMapsResult) => {
      return allMapsResult.rows;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

//retrieve map by id
const getMapById = (mapId) => {
  const mapsIdQuery = {
    text: 'SELECT * FROM maps WHERE id = $1;',
    values: [mapId],
  }
  return db.query(mapsIdQuery)
    .then((mapsIdResult) => {
      return mapsIdResult.rows[0];
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

//add new map
const addNewMap = (mapInfo) => {
  const newMapQuery = {
    text: 'INSERT INTO maps (user_key, name, date_created) VALUES ($1, $2, $3) RETURNING *;',
    values: [mapInfo.user_key, mapInfo.name, mapInfo.date_created],
  };
  return db.query(newMapQuery)
  .then((newMapResult) => {
    return newMapResult.rows[0];
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
}

//get all markers for a specific map id
const getMarkers = (mapId) => {
  const getMarkersQuery = {
    text: 'SELECT * FROM map_points WHERE maps_key = $1;',
    values: [mapId],
  };
  return db.query(getMarkersQuery)
  .then((getMarkersResult) => {
    return getMarkersResult.rows;
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
}

//add new map point
const addNewMapPoint = (mapPointInfo) => {
  const newMapPointQuery = 'INSERT INTO map_points (user_key, maps_key, x_coordinate, y_coordinate, name, description, thumbnail) RETURNING *;';
  return db.query(newMapPointQuery)
  .then((newMapPointResult) => {
    return newMapPointResult.rows;
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
}

module.exports = { addNewMap ,getMapById, getAllMaps, getMarkers, addNewMapPoint }
