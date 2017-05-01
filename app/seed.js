'use strict';

console.log('Loading environment');

const Grown = require('grown');
const path = require('path');

const cwd = process.cwd();

// setup environment
Grown.env(cwd);

const $ = new Grown({
  env: process.env.NODE_ENV || 'development',
});

$.use(Grown.plugs.models(__dirname));

console.log('Loading data files');

const files = process.argv.slice(2)
  .filter(input => input.indexOf('.json') > -1)
  .map(file => path.join(process.cwd(), file))
  .map(file => require(file));

console.log('Loading environment');

let Entry;

$.emit('start').then(() => {
  Entry = $.extensions.models.Entry;

  console.log('Creating new entries');

  return Entry.destroy({ truncate: true })
    .then(() =>
      Promise.all(files.map(data =>
        Entry.create({
          ref: data.id,
          likes: data.likes,
          dislikes: data.likes,
          avgQuality: 0,
        }))));
})
.then(() => Entry.count().then(count => {
  console.log(`${count} entries were created`);
}))
.catch(error => {
  console.log(error.stack);
});
