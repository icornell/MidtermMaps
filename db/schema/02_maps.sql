-- Drop and recreate maps table

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_key INT FOREIGN KEY REFERENCES users(id),
  name TEXT NOT NULL,
  date_created DATE NOT NULL
);
