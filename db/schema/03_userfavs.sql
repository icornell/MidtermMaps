-- Drop and recreate user_favourites table

DROP TABLE IF EXISTS user_favourites CASCADE;
CREATE TABLE user_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_key INT FOREIGN KEY REFERENCES users(id),
  maps_key INT FOREIGN KEY REFERENCES maps(id)
);
