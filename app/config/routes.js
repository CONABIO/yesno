module.exports = map =>
  map()
    .get('/', 'Home#index')
    .get('/sources', 'API#sources')
    .post('/entries', 'API#aggregate');
