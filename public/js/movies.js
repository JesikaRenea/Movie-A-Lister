$(function() {
  $(".addToWatchlist").on("click", function(event) {
    event.preventDefault();

    // var id = $(this).data("id");

    var newWatchlist = {
      id: $(this).data("id"),
      title: $(this).data("title"),
      wantToWatch: 1,
      favorite: 0
    };

    console.log(newWatchlist);
    // Send the PUT request.
    $.ajax("/api/movies/", {
      type: "PUT",
      data: newWatchlist
    }).then(function() {
      console.log("changed movie to", newWatchlist);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".addToFavorites").on("click", function(event) {
    event.preventDefault();

    var newFavorite = {
      id: $(this).data("id"),
      title: $(this).data("title"),
      favorite: 1,
      wantToWatch: 0
    };

    console.log(newFavorite);
    // Send the PUT request.
    $.ajax("/api/movies/", {
      type: "PUT",
      data: newFavorite
    }).then(function() {
      console.log("changed movie", newFavorite);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  //THIS WORKS TO ADD A MOVIE THE USER INPUTS
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newMovie = {
      title: $("#newmovie")
        .val()
        .trim()
    };
    // Send the POST request.
    $.ajax("/api/movies", {
      type: "POST",
      data: newMovie
    }).then(function() {
      console.log("Added Movie to List");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  //THIS WORKS TO DELETE MOVIES
  $(".delete-movie").on("click", function() {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/movies/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("Deleted Movie", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
