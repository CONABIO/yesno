module.exports = map =>
  map()
    .get('/test', 'Home#index');
