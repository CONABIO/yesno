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

  $.use(Grown.plugs.render(__dirname));
  $.use(Grown.plugs.router(__dirname));
  $.use(Grown.plugs.models(__dirname));
  $.use(Grown.plugs.session($.get('session')));

  return $;
};

// export framework version and teardown
module.exports.version = Grown.version;
module.exports.teardown = cb => Grown.burn(cb);
