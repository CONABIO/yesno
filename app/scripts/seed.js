'use strict';

const path = require('path');

module.exports = ($, argv, logger) => {
  logger.ok('Loading data files...');

  const files = argv.raw
    .filter(input => input.indexOf('.json') > -1)
    .map(file => path.join(process.cwd(), file))
    .map(file => require(file));

  const Source = $.extensions.models.Source;

  logger.ok('Creating new sources...');

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
      logger.ok(`${count} sources were created`);
    }))
    .catch(logger.fail);
};
