CREATE TABLE  users (
  user_id PRIMARY KEY, 
  derby_name VARCHAR(25),
  password TEXT NOT NULL,
  email TEXT NOT NULL
  CHECK (position('@' IN email) > 1),
  about TEXT NOT NULL,
  location TEXT NOT NULL, 
  level TEXT NOT NULL, 
  facebook_name TEXT, 
  played_rulesets TEXT, 
  associated_leagues TEXT
);

COPY users_data
FROM '/docker-entrypoint-initdb.d/users.csv'
DELIMITER ','
CSV HEADER;