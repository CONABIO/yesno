'use strict';

const path = require('path');

module.exports = ($, argv) => {
  console.log('Loading data files...');

  const files = argv.raw
    .filter(input => input.indexOf('.json') > -1)
    .map(file => path.join(process.cwd(), file))
    .map(file => require(file));

  const Entry = $.extensions.models.Entry;

  console.log('Creating new entries...');

  Entry.destroy({ truncate: true })
    .then(() =>
      Promise.all(files.map(data =>
        Entry.create({
          ref: data.id,
          root: true,
          likes: data.likes,
          dislikes: data.likes,
          avgQuality: 0,
        }))))
  .then(() => Entry.count().then(count => {
    console.log(`${count} entries were created`);
  }))
  .catch(error => {
    console.log(error.stack);
  });
};
