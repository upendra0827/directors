const express = require("express");
const bodyParser = require("body-parser");
const client = require("./connection");
const {
  getDirectors,
  addNewDirector,
  getDirectorById,
  editDirector,
  deleteDirector,
} = require("./Routes/directorRoutes");
const { getAllMovies, addMovie, getMovieById, editMovie, deleteMovie, getAllMoviesOfADirector, getMoviesByCategory, getMoviesByCelebrity } = require("./Routes/movieRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  const corsWhiteList = ['http://localhost:3000/', "https://the-imdb-project.herokuapp.com/"]

  if (corsWhiteList.indexOf(req.headers.origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  }
    next();
  });

app.get("/", (req, res) => {
  res.send("API is ready");
});
app.get("/directors", getDirectors);
app.post("/director", addNewDirector);
app.get("/director/:id", getDirectorById);
app.put("/director/:id", editDirector);
app.delete("/director/:id", deleteDirector);
app.get("/movies", getAllMovies);
app.post("/movie", addMovie);
app.get('/movie/:id', getMovieById);
app.put('/movie/:id', editMovie);
app.delete('/movie/:id', deleteMovie);
app.get('/movies/:id', getAllMoviesOfADirector);
app.get('/movies/category/:category', getMoviesByCategory);
app.get('/movies/celebrity/:celebrity', getMoviesByCelebrity);

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log("Server is running in PORT : ", PORT);
});

client.connect();

