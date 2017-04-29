'use strict';

const Grown = require('grown');
const path = require('path');

const cwd = process.cwd();

// setup environment
Grown.env(cwd);

// fresh context
module.exports = () => {
  const $ = new Grown({
    env: process.env.NODE_ENV || 'development',
  });

  $.use(Grown.plugs.render(__dirname));
  $.use(Grown.plugs.router(__dirname));

  $.mount(require('serve-static')(path.join(cwd, 'public')));

  return $;
};

// export framework version and teardown
module.exports.version = Grown.version;
module.exports.teardown = cb => Grown.burn(cb);
