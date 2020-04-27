var currentDate = moment().format('YYYY-MM-DD')
console.log(currentDate)

var inTheatersQuery = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=" + currentDate + "&api_key=c81ffb7ed9813dd7f5aa841a64da8416"

var individualMovie = "https://api.themoviedb.org/3/search/movie?api_key=c81ffb7ed9813dd7f5aa841a64da8416`&query=Jack+Reacher"

var popularQuery = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c81ffb7ed9813dd7f5aa841a64da8416"

var apiKey = "api_key=c81ffb7ed9813dd7f5aa841a64da8416";

$(document).ready(function () {
  threeOutNow();
  threePopularMovies();
})

$(document).on("click", "#moreOutNow", function (event){
  event.preventDefault();
  $("#threeOutNow").empty();
  allOutNow();
});

$(document).on("click", "#morePopular", function (event){
  event.preventDefault();
  $("#threePopularMovies").empty();
  allPopularMovies();
})

$(document).on("click", ".showModal", function (event) {
  $(`.modal[data-id=${$(this).data('id')}]`).addClass("is-active");
});

$(document).on("click", ".modal-close", function (event) {
  $(`.modal[data-id=${$(this).data('id')}]`).removeClass("is-active");
});

$(document).on("click", ".favorite", function (event) {
  event.preventDefault();
  var newWatchlist = {
    poster: $(this).data("poster"),
    title: $(this).data("title"),
    wantToWatch: 0,
    favorite: 1
  };
  console.log(newWatchlist);
  // Send the PUT request.
  $.ajax("/api/movies/", {
    type: "POST",
    data: newWatchlist
  }).then(function () {
    console.log("changed movie to", newWatchlist);
    // Reload the page to get the updated list
    location.reload();
  });
});

$(document).on("click", ".watchlist", function (event) {
  // alert("DOES THIS DO SOMETHING??");
  event.preventDefault();
  var newFavorite = {
    poster: $(this).data("poster"),
    title: $(this).data("title"),
    wantToWatch: 1,
    favorite: 0
  };
  console.log(newFavorite);
  // Send the PUT request.
  $.ajax("/api/movies/", {
    type: "POST",
    data: newFavorite
  }).then(function () {
    console.log("changed movie to", newFavorite);
    // Reload the page to get the updated list
    location.reload();
  });
});







//GOOD
function threeOutNow() {
  $.ajax({
    url: inTheatersQuery,
    method: 'GET'
  })
    .then(function (res) {
      console.log(res)
      for (var i = 0; i < 8; i++) {
        var imgURL = res.results[i].poster_path;
        if (imgURL) {
          imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL
          var image = $('<img class="moviePoster" alt= "Image Unavailable">').attr("src", imgURL);
          var movieDiv = $('<div class= "column">');
          movieDiv.attr('data-title', res.results[i].title);
          var showModal = $(`<br> 
          <button class="button showModal" data-id="${res.results[i].id}"> More Info </button>
          <button class="button favorite" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-heartbeat"
          aria-hidden="true"></i></button>
          <button class="button watchlist" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-eye"
          alt="Add to Watchlist" aria-hidden="true"></i></button>`)
          movieDiv.append(image).append(showModal);
        }
        var movieInfo = `
        
      <div class="modal is-clipped" data-id= "${res.results[i].id}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1 class="title has-text-success">${res.results[i].title}</h1>
        <h3 class="subtitle has-text-success">Overview: ${res.results[i].overview}</h2>
          <h5 class="subtitle has-text-success">Release Date: ${res.results[i].release_date}</h5>
            <h5 class= "subtitle has-text-success">Movie Poplarity Rating: ${res.results[i].popularity} </h5>
              <a href="https://www.themoviedb.org/movie/${res.results[i].id}${res.results[i].title}?language=en-US" target="_blank">Link to more info on ${res.results[i].title}</a>
      
              </div>
      <button class="modal-close is-large" data-id="${res.results[i].id} "aria-label="close"></button><br>

  </div>
 
      `
        $('#threeOutNow').append(movieDiv).append(movieInfo)
      }
    });
}

function allOutNow() {
  $.ajax({
    url: inTheatersQuery,
    method: 'GET'
  }).then(function (res) {
    console.log(res)
    for (var i = 0; i < 15; i++) {
      var imgURL = res.results[i].poster_path;
      if (imgURL) {
        imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL
        var image = $('<img class="moviePoster" alt= "Image Unavailable">').attr("src", imgURL);
        var movieDiv = $('<div class= "column">');
        movieDiv.attr('data-title', res.results[i].title);
        var showModal = $(`<br>
        <button class="button showModal" data-id="${res.results[i].id}"> More Info </button> 
        <button class="button favorite" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-heartbeat"
        aria-hidden="true"></i></button>
        <button class="button watchlist" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-eye"
        alt="Add to Watchlist" aria-hidden="true"></i></button>`)
        movieDiv.append(image).append(showModal);
      }
      var movieInfo = `
      <div class="modal is-clipped" data-id= "${res.results[i].id}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1 class="title has-text-success">${res.results[i].title}</h1>
        <h3 class="subtitle has-text-success">Overview: ${res.results[i].overview}</h2>
          <h5 class="subtitle has-text-success">Release Date: ${res.results[i].release_date}</h5>
            <h5 class= "subtitle has-text-success">Movie Poplarity Rating: ${res.results[i].popularity} </h5>
              <a href="https://www.themoviedb.org/movie/${res.results[i].id}${res.results[i].title}?language=en-US" target="_blank">Link to more info on ${res.results[i].title}</a>
      </div>
      <button class="modal-close is-large" data-id="${res.results[i].id} "aria-label="close"></button>
  </div>
 
      `
      $('#threeOutNow').append(movieDiv).append(movieInfo)
    }
  });
}

function threePopularMovies() {
  $.ajax({
    url: popularQuery,
    method: 'GET'
  }).then(function (res) {
    console.log(res)
    for (var i = 0; i < 5; i++) {
      var imgURL = res.results[i].poster_path;
      if (imgURL) {
        imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL
        var image = $('<img class="moviePoster" alt= "Image Unavailable">').attr("src", imgURL);
        var movieDiv = $('<div class= "column">');
        movieDiv.attr('data-title', res.results[i].title);
        var showModal = $(`
        <br>
        <button class="button showModal" data-id="${res.results[i].id}"> More Info </button>
        <button class="button favorite" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-heartbeat"
        aria-hidden="true"></i></button>
        <button class="button watchlist" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-eye"
        alt="Add to Watchlist" aria-hidden="true"></i></button>`)
        movieDiv.append(image).append(showModal);
      }
      var movieInfo = `
      <div class="modal is-clipped" data-id= "${res.results[i].id}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1 class="title has-text-success">${res.results[i].title}</h1>
        <h3 class="subtitle has-text-success">Overview: ${res.results[i].overview}</h2>
          <h5 class="subtitle has-text-success">Release Date: ${res.results[i].release_date}</h5>
            <h5 class= "subtitle has-text-success">Movie Poplarity Rating: ${res.results[i].popularity} </h5>
              <a href="https://www.themoviedb.org/movie/${res.results[i].id}${res.results[i].title}?language=en-US" target="_blank">Link to more info on ${res.results[i].title}</a>
      </div>
      <button class="modal-close is-large" data-id="${res.results[i].id} "aria-label="close"></button>

  </div>
      `
      $('#threePopularMovies').append(movieDiv).append(movieInfo)
    }
  });
}

function allPopularMovies() {
  $.ajax({
    url: popularQuery,
    method: 'GET'
  }).then(function (res) {
    console.log(res)
    for (var i = 0; i < 10; i++) {
      var imgURL = res.results[i].poster_path;
      if (imgURL) {
        imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL
        var image = $('<img class="moviePoster" alt= "Image Unavailable">').attr("src", imgURL);
        var movieDiv = $('<div class= "column">');
        movieDiv.attr('data-title', res.results[i].title);
        var showModal = $(`<br>
        <button class="button showModal" data-id="${res.results[i].id}"> More Info </button>
        <button class="button favorite" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-heartbeat"
        aria-hidden="true"></i></button>
        <button class="button watchlist" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-eye"
        alt="Add to Watchlist" aria-hidden="true"></i></button>`)
        movieDiv.append(image).append(showModal);
      }
      var movieInfo = `
          <div class="modal is-clipped" data-id= "${res.results[i].id}">
          <div class="modal-background"></div>
          <div class="modal-content">
    
            <h1 class="title has-text-success">${res.results[i].title}</h1>
            <h3 class="subtitle has-text-success">Overview: ${res.results[i].overview}</h2>
              <h5 class="subtitle has-text-success">Release Date: ${res.results[i].release_date}</h5>
                <h5 class= "subtitle has-text-success">Movie Poplarity Rating: ${res.results[i].popularity} </h5>
                  <a href="https://www.themoviedb.org/movie/${res.results[i].id}${res.results[i].title}?language=en-US" target="_blank">Link to more info on ${res.results[i].title}</a>
          </div>
          <button class="modal-close is-large" data-id="${res.results[i].id} "aria-label="close"></button>
      </div>
           `
      $('#threePopularMovies').append(movieDiv).append(movieInfo)
    }
  });
}


//GOOD TO GO
function searched() {
  $('.button').on("click", (event) => {
    $("#movie").empty();
    event.preventDefault()
    const searchedMovie = $('.searchBox').val().trim().split(" ").join("+")
    console.log(searchedMovie)
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?api_key=c81ffb7ed9813dd7f5aa841a64da8416&query=" + searchedMovie,
      method: "GET"
    })
      .then(function (res) {
        console.log(res)
        for (var i = 0; i < 5; i++) {
          var imgURL = res.results[i].poster_path;
          if (imgURL) {
            imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL
            var image = $('<img class="moviePoster" alt= "Image Unavailable">').attr("src", imgURL);
            var movieDiv = $('<div class= "movie column">');
            movieDiv.attr('data-title', res.results[i].title);
            var showModal = $(`<br><button class="button showModal" data-id="${res.results[i].id}"> More Info </button>
            <button class="button favorite" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-heartbeat"
            aria-hidden="true"></i></button>
            <button class="button watchlist" data-title="${res.results[i].title}" data-poster="${res.results[i].poster_path}"><i class="fa fa-eye"
            alt="Add to Watchlist" aria-hidden="true"></i></button>`)
            movieDiv.append(image).append(showModal);
            var movieInfo = `
            <div class="modal is-clipped" data-id= "${res.results[i].id}">
            <div class="modal-background"></div>
            <div class="modal-content">
              <h1 class="title has-text-success">${res.results[i].title}</h1>
              <h3 class="subtitle has-text-success">Overview: ${res.results[i].overview}</h2>
                <h5 class="subtitle has-text-success">Release Date: ${res.results[i].release_date}</h5>
                  <h5 class= "subtitle has-text-success">Movie Poplarity Rating: ${res.results[i].popularity} </h5>
                    <a href="https://www.themoviedb.org/movie/${res.results[i].id}${res.results[i].title}?language=en-US" target="_blank">Link to more info on ${res.results[i].title}</a>
            </div>
            <button class="modal-close is-large" data-id="${res.results[i].id} "aria-label="close"></button>
            </div>
              `
            $('#movie').append(movieDiv).append(movieInfo)
          }
        };
      })
  });
}
searched();