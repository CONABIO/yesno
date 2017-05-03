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

  Promise.all(files.map(data =>
    Source.destroy({
      where: {
        ref: data.id,
      },
    }).then(() =>
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
