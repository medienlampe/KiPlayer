+(function() {
  'use strict';

  /**
   * KiPlayer sample config
   * @type {Object}
   */
  var KiPlayerConfig = {
    descriptionTime: 3000,
    alwaysShowTitle: true,
    infiniteRepeat: true,
    movies: [
      {
        title: 'Movie 1',
        route: './media/movie1.mp4',
        description:
          'In eu dolore sit sunt nulla id veniam duis commodo id reprehenderit nulla esse elit est mollit.'
      },
      {
        title: 'Movie 2',
        route: './media/movie2.mp4',
        description:
          'Pariatur tempor est aute nisi pariatur qui cillum esse est est ut adipisicing.'
      },
      {
        title: 'Movie 3',
        route: './media/movie3.mp4',
        description:
          'Sed exercitation veniam est nulla qui dolore pariatur ut dolor ullamco labore aliqua commodo irure officia culpa adipisicing.'
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
        descriptionTime: 3000,
        alwaysShowTitle: false,
        infiniteRepeat: false,
        movies: []
      };

    self.config = KiPlayerConfig || sampleConfig;

    return self;
  };

  /**
   * Checks if the reel consists of movies and shows every movie configured.
   * @return {self}
   */
  KiPlayer.prototype.runReel = function() {
    var self = this;

    if (!self.config.movies.length) {
      return;
    }

    self.config.movies.forEach(movie => {
      runMovie(movie);
    });

    return self;
  };

  /**
   * Shows single description and movie.
   * @param  {{title: string, route: string, description: string}}
   * @return {self}
   */
  KiPlayer.prototype.runMovie = function(movie) {
    self = this;

    if (!movie) {
      return;
    }

    self.showDescription(movie.title, movie.description);

    setTimeout(() => {
      self.hideDescription();
      self.showVideo();
    }, self.config.descriptionTime);

    return self;
  };

  /**
   * Bootstrapper
   * @return {self}
   */
  KiPlayer.prototype.run = function() {
    var self = this;

    do {
      self.runReel();
    } while (self.config.infiniteRepeat);

    return self;
  };
})();
