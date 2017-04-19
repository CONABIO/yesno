'use strict';

/* eslint-disable global-require */

const Grown = require('grown');
const path = require('path');

const cwd = process.cwd();

// setup environment
Grown.env(cwd);

// fresh context
module.exports = () => {
  const $ = new Grown({
    env: process.env.NODE_ENV || 'development',
    // upload: {
    //   multiple: false,
    //   maxFiles: 1,
    // },
  });

  $.use(Grown.plugs.render(__dirname));
  $.use(Grown.plugs.router(__dirname));
  // $.use(Grown.plugs.models(__dirname));
  // $.use(Grown.plugs.upload($.get('upload')));

  // $.mount(require('cors')());
  $.mount(require('serve-static')(path.join(cwd, 'public')));
  // $.mount(require('body-parser').urlencoded({ extended: false }));

  return $;
};

// export framework version and teardown
module.exports.version = Grown.version;
module.exports.teardown = cb => Grown.burn(cb);
