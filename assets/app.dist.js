+(function() {
  'use strict';

  /**
   * KiPlayer sample config
   * @type {Object}
   */
  var KiPlayerConfig = {
    descriptionElement: document.getElementById('description'),
    titleElement: document.getElementById('movietitle'),
    movieWrapperElement: document.getElementById('movie'),
    movieDescriptionElement: document.getElementById('moviedescription'),
    movieLengthElement: document.getElementById('movielength'),
    movieElement: document.getElementById('movieobject'),
    descriptionTime: 5000,
    alwaysShowTitle: true,
    infiniteRepeat: true,
    movies: [
      {
        title: 'Movie 1',
        length: '13:37',
        source: './media/TestMovie.mp4',
        description:
          'This is a sample movie downloaded from https://www.sample-videos.com.'
      },
      {
        title: 'Movie 2',
        length: '3:37',
        source: './media/TestMovie.mp4',
        description:
          'This is a sample movie downloaded from https://www.sample-videos.com.'
      },
      {
        title: 'Movie 1',
        length: '1:37',
        source: './media/TestMovie.mp4',
        description:
          'This is a sample movie downloaded from https://www.sample-videos.com.'
      }
    ]
  };

  /**
   * KiPlayer
   * Constructor
   *
   * @return {KiPlayer}
   */
  var KiPlayer = function() {
    var self = this,
      sampleConfig = {
        descriptionElement: false,
        titleElement: false,
        movieWrapperElement: false,
        movieDescriptionElement: false,
        movieLengthElement: false,
        movieElement: false,
        descriptionTime: 3000,
        alwaysShowTitle: false,
        infiniteRepeat: false,
        movies: []
      };

    self.config = KiPlayerConfig || sampleConfig;

    if (
      !self.config.descriptionElement ||
      !self.config.movieElement ||
      !self.config.movieWrapperElement
    ) {
      return;
    }

    if (self.config.movies.length) {
      self.startVideo(0, self.config.alwaysShowTitle);
    }

    return self;
  };

  /**
   * @param  {number} Index of movie in movies array to be played next.
   * @param  {boolean} Show the title of the movie the whole time.
   * @return {KiPlayer}
   */
  KiPlayer.prototype.startVideo = function(index, alwaysShowTitle) {
    var self = this,
      movieElement = self.config.movieElement,
      movieWrapperElement = self.config.movieWrapperElement,
      descriptionElement = self.config.descriptionElement,
      movieDescriptionElement = self.config.movieDescriptionElement,
      movieLengthElement = self.config.movieLengthElement,
      titleElement = self.config.titleElement,
      movie;

    if (self.config.movies.length >= index) {
      if (self.config.infiniteRepeat) {
        index = 0;
      } else {
        return;
      }
    }

    movie = self.config.movies[index];

    titleElement.classList.add('hidden');
    movieWrapperElement.classList.add('hidden');

    if (movie.description != '') {
      descriptionElement.getElementsByTagName('h2')[0].innerHTML = movie.title;
      movieDescriptionElement.innerHTML = movie.description;
      movieLengthElement.innerHTML = movie.length;
    }

    setTimeout(function() {
      movieWrapperElement.classList.remove('hidden');
      if (alwaysShowTitle) {
        titleElement.innerHTML = movie.title;
        titleElement.classList.remove('hidden');
      }
      movieElement.setAttribute('src', movie.source);
      movieElement.play();

      movieElement.addEventListener('ended', function() {
        self.startVideo(++index);
      });
    }, self.config.descriptionTime);

    return self;
  };

  var KiPlayerInstance = new KiPlayer();
})();
