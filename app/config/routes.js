module.exports = map =>
  map()
    .get('/entries', 'API#entries');
