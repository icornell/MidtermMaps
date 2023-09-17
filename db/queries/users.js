const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

//lookup user maps
const userMaps = (user_id) => {
  const userMapsQuery = {
    text: 'SELECT * FROM maps WHERE user_key = $1;',
    values: [user_id],
  };

  return db.query(userMapsResult)
    .then((userMapsResult) => {
      return userMapsResult.rows;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

//lookup user liked maps
const userLikes = (user_id) => {
  const userLikesQuery = {
    text: 'SELECT * FROM user_favourites WHERE user_key = $1;',
    values: [user_id],
  };

  return db.query(userLikesResult)
    .then((userLikesResult) => {
      return userLikesResult.rows;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = { getUsers, userMaps, userLikes };
