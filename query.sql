CREATE TABLE Director(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(25),
    bio VARCHAR(255),
    imageurl VARCHAR(255), 
    createdat DATE DEFAULT CURRENT_DATE
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    director_id INT,
    moviename VARCHAR(30),
    moviedesc VARCHAR(255),
    movieposter VARCHAR(255),
    createdat DATE  DEFAULT CURRENT_DATE
);


ALTER TABLE movies ADD COLUMN categories TEXT[], ADD COLUMN leadroles TEXT[];