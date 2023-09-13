-- Drop and recreate map_points table

DROP TABLE IF EXISTS map_points CASCADE;
CREATE TABLE map_points (
  id SERIAL PRIMARY KEY NOT NULL,
  user_key INT FOREIGN KEY REFERENCES users(id),
  maps_key INT FOREIGN KEY REFERENCES maps(id)
  x_coordinate INT NOT NULL,
  y_coordinate INT NOT NULL,
  name TEXT,
  description VARCHAR(250),
  thumbnail VARCHAR(250)
);
