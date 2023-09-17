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
    values: mapId,
  }
  return db.query(mapsIdQuery)
    .then((mapsIdResult) => {
      return mapsIdResult.rows;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

//add new map
const addNewMap = (mapInfo) => {
  const newMapQuery = {
    text: 'INSERT INTO maps (id, user_key, name, date_created) VALUES ($1);'
    values: mapInfo,
  };
  return db.query(allMapsQuery)
  .then((allMapsResult) => {
    return allMapsResult.rows;
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
}

module.exports = { addNewMap ,getMapById, getAllMaps }
