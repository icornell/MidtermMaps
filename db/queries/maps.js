const db = require('../connection');

//retreive all maps from database
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

module.exports = { getAllMaps }
