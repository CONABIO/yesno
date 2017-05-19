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
    session: {
      secret: process.env.SESSION_SECRET || 'secret*value',
      keys: (process.env.SESSION_KEYS || 'secret*value').split(/\s+/),
      maxAge: parseInt(process.env.SESSION_MAXAGE || 0, 10) || 86400000,
    },
  });

  if ($.get('env') === 'production') {
    $.mount(require('serve-static')(path.join(cwd, 'public')));
  }

  $.use(Grown.plugs.router({
    middlewares: {
      settings: path.join(cwd, 'app/config/middlewares.js'),
      folders: path.join(cwd, 'app/middlewares'),
    },
    settings: path.join(cwd, 'app/config/routes.js'),
    folders: path.join(cwd, 'app/controllers'),
  }));

  $.use(Grown.plugs.models({
    settings: path.join(cwd, 'app/config/database.js'),
    folders: path.join(cwd, 'app/models'),
  }));

  $.use(Grown.plugs.render({
    folders: path.join(cwd, 'build/views'),
  }));

  $.use(Grown.plugs.session($.get('session')));
  $.mount(require('body-parser').json());

  return $;
};

// export framework version and teardown
module.exports.version = Grown.version;
module.exports.teardown = cb => Grown.burn(cb);
