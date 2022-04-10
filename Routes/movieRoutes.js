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
  let {
    director_id,
    moviename,
    moviedesc,
    movieposter,
    categories,
    leadroles,
  } = req.body;
  categories = categories.split(",");
  leadroles = leadroles.split(",");
  const queryString =
    "INSERT INTO movies(director_id, moviename,moviedesc,movieposter,categories,leadroles) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [
    director_id,
    moviename,
    moviedesc,
    movieposter,
    categories,
    leadroles,
  ];
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
  let { moviename, moviedesc, movieposter, categories, leadroles } = req.body;
  categories = `{${categories}}`;
  leadroles = `{${leadroles}}`;
  const queryString = `UPDATE movies SET moviename='${moviename}',moviedesc='${moviedesc}',movieposter='${movieposter}',categories='${categories}',leadroles='${leadroles}' WHERE id='${movieId}' RETURNING *`;
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
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows });
    }
  });
};

const getMoviesByCategory = (req, res) => {
  const category = req.params.category;
  const queryString = `SELECT * FROM movies WHERE '${category}' = ANY(categories::TEXT[])`;
  client.query(queryString, (error, result) => {
    if (error) {
      return res.status(404).send({ error: "Technical issue" });
    } else {
      return res.status(200).send({ data: result.rows });
    }
  });
};

const getMoviesByCelebrity=(req,res)=>{
    const {celebrity}=req.params;
    const queryString = `SELECT * FROM movies WHERE '${celebrity}' = ANY(leadroles::TEXT[])`;
    client.query(queryString, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(404).send({ error: "Technical issue" });
      } else {
        return res.status(200).send({ data: result.rows });
      }
    });
}

module.exports = {
  getAllMovies,
  addMovie,
  getMovieById,
  editMovie,
  deleteMovie,
  getAllMoviesOfADirector,
  getMoviesByCategory,
  getMoviesByCelebrity
};
