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
const { getAllMovies, addMovie, getMovieById, editMovie, deleteMovie, getAllMoviesOfADirector } = require("./Routes/movieRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.get('/movie/:id',getMovieById);
app.put('/movie/:id',editMovie);
app.delete('/movie/:id',deleteMovie);
app.get('/movies/:id',getAllMoviesOfADirector)

const PORT = 3300 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running in PORT : ", PORT);
});

client.connect();
