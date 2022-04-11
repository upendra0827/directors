# Movie & director API

1. Fork the repository
2. Create a new Heroku app
3. Choose Github as deployment method and connect to your
   github account.
5. Go to Resources -> Add-ons -> Heroku Postgres and add it.
6. Now deploy the app to Heroku.
7. Open your terminal and run this command:

   ```
   heroku pg:psql --app <name-of-your-app>
   ```

   Make sure you have psql installed.
8. Now you can access the database.
9. Now create `directors` table in the database:
    ```
    CREATE TABLE Director(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(25),
    bio VARCHAR(255),
    imageurl VARCHAR(255),
    createdat DATE DEFAULT CURRENT_DATE
    );

    ```

10. Now create `movies` table in the database:
    ```

    CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    director_id INT,
    moviename VARCHAR(30),
    moviedesc VARCHAR(255),
    movieposter VARCHAR(255),
    createdat DATE  DEFAULT CURRENT_DATE,
    categories TEXT[],
    leadroles TEXT[];
    );
    ```
11. Run `\q` to exit the database.
11. Now use the api to add some data to the database.

### Routes
[CurrUrl](https://tmdb-node-api.herokuapp.com/)

* get('/directors')
  
  * fetches all the directors in the database.

* post('/director')

    * adds a new director. mandatory fields are (name,description,imageurl)

* get('/director/:id')
  
    * get data of a single director

* put("/director/:id")

    * edit info of a dirctor mandatory fields are (name,description,imageurl)

*  delete("/director/:id")
    * delete a director by his id.

*  get("/movies") 
    
    * get all movies of director

* post("/movie/")

    * create a movie (fields are:  director_id, moviename, moviedesc movieposter, categories, leadroles)
    * movieposter is the url of poster of movie.
    * director_id: id of director who has created this movie
    * moviename: a string
    * moviedesc: A string under 255 char for a short summary  
    * categories: A comma ',' saperated list of string
    * leadroles: A comma ',' saperated list of actors

*  get('/movie/:id')

    * get movie details by its Id

* put("/movie/:id")

    * edit details of a particular movie (fields are: moviename, moviedesc movieposter, categories, leadroles);
    * moviename: a string
    * moviedesc: A string under 255 char for a short summary  
    * categories: A comma ',' saperated list of string
    * leadroles: A comma ',' saperated list of actors
    * movieposter is the url of poster of movie.

* delete("movie/:id")
    * delete movie by id

* get('/movies/:id')
    * get all movies of a director 
    * id - director id

* get('/movies/category/:category')

    * get all movie which is in a particular catogery (eg sifi,action)


* get('/movies/celebrity/:celebrity')
    
    * get a all movies which includes a particular celebrity
