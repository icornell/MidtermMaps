const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getUser = (user_id) => {
  const getUserQuery = {
    text: 'SELECT * FROM users WHERE id = $1;',
    values: [user_id],
  };

  return db.query(getUserQuery)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

//lookup user maps
const userMaps = (user_id) => {
  const userMapsQuery = {
    text: 'SELECT * FROM maps WHERE user_key = $1;',
    values: [user_id],
  };

  return db.query(userMapsQuery)
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

  return db.query(userLikesQuery)
    .then((userLikesResult) => {
      return userLikesResult.rows;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = { getUsers, getUser, userMaps, userLikes };
