var db = require("../models");

module.exports = function(app) {
  //List All Movies in our Database
  app.get("/api/movies", function(req, res) {
    db.Movie.findAll({}).then(function(dbMovies) {
      res.json(dbMovies);
      // res.render("user-profile", { movies: dbMovies });
    });
  });
  //Displays only favorite = true movies (favorites)
  app.get("/api/movies-favorites", function(req, res) {
    db.Movie.findAll({
      where: {
        favorite: 1
      }
    }).then(function(dbMovieFav) {
      res.json(dbMovieFav);
    });
  });
  //Displays only wantToWatch = true movies (watchlist)
  app.get("/api/movies-watchlist", function(req, res) {
    db.Movie.findAll({
      where: {
        wantToWatch: 1
      }
    }).then(function(dbMovieWatchlist) {
      res.json(dbMovieWatchlist);
    });
  });

  // POST route for saving a new movie
  app.post("/api/movies", function(req, res) {
    console.log(req.body);
    console.log(req.user);
    db.Movie.create({
      poster: req.body.poster,
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      rating: req.body.rating,
      genre: req.body.genre,
      favorite: req.body.favorite,
      wantToWatch: req.body.wantToWatch,
      UserId: req.user.id
    }).then(function(dbMovieFav) {
      res.json(dbMovieFav);
    });
  });

  app.delete("/api/movies/:id", function(req, res) {
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  //Update movies from Watchlist to Favorites
  app.put("/api/movies", function(req, res) {
    db.Movie.update(
      {
        poster: req.body.poster,
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        genre: req.body.genre,
        favorite: req.body.favorite,
        wantToWatch: req.body.wantToWatch
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function(dbMovie) {
        res.json(dbMovie);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
