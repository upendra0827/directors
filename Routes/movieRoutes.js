const client = require("../connection");

const getAllMovies = (req, res) => {
  client.query(`SELECT * FROM movies`, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows });
    }
  });
};

const addMovie = (req, res) => {
  const { director_id, moviename, moviedesc, movieposter } = req.body;
  const queryString =
    "INSERT INTO movies(director_id, moviename,moviedesc,movieposter) VALUES($1, $2, $3, $4) RETURNING *";
  const values = [director_id, moviename, moviedesc, movieposter];
  client.query(queryString, values, (error, result) => {
    if (error) {
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows[0] });
    }
  });
};

const getMovieById = (req, res) => {
  const movieId = req.params.id;
  const queryString = `SELECT * FROM movies WHERE id='${movieId}'`;
  client.query(queryString, (error, result) => {
    if (error) {
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows });
    }
  });
};
const editMovie = (req, res) => {
  const movieId = req.params.id;
  const { moviename, moviedesc, movieposter } = req.body;
  const queryString = `UPDATE movies SET moviename='${moviename}',moviedesc='${moviedesc}',movieposter='${movieposter}' WHERE id='${movieId}' RETURNING *`;
  client.query(queryString, (error, result) => {
    if (error) {
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows[0] });
    }
  });
};

const deleteMovie = (req, res) => {
  const movieId = req.params.id;
  const queryString = `DELETE FROM movies WHERE id=${movieId} RETURNING *`;
  client.query(queryString, (error, result) => {
    if (error) {
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows[0] });
    }
  });
};

const getAllMoviesOfADirector = (req, res) => {
  const directorId = req.params.id;
  const queryString = `SELECT * FROM movies WHERE director_id=${directorId}`;
  client.query(queryString, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows });
    }
  });
};

module.exports = {
  getAllMovies,
  addMovie,
  getMovieById,
  editMovie,
  deleteMovie,
  getAllMoviesOfADirector,
};
