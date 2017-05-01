module.exports = map =>
  map()
    .get('/', 'Home#index')
    .get('/entries', 'API#entries')
    .post('/entries', 'API#aggregate');
