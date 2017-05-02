'use strict';

const path = require('path');

module.exports = ($, argv) => {
  console.log('Loading data files...');

  const files = argv.raw
    .filter(input => input.indexOf('.json') > -1)
    .map(file => path.join(process.cwd(), file))
    .map(file => require(file));

  const Source = $.extensions.models.Source;

  console.log('Creating new sources...');

  Source.destroy({ truncate: true })
    .then(() =>
      Promise.all(files.map(data =>
        Source.create({
          ref: data.id,
        }))))
  .then(() => Source.count().then(count => {
    console.log(`${count} sources were created`);
  }))
  .catch(error => {
    console.log(error.stack);
  });
};
