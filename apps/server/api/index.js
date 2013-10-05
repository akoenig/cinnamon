/*
 * cinnamon
 *
 * A continuous integration server on top of substacks cicada.
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

'use strict';

var build = require('./build'),
  logfile = require('./logfile');

exports.init = function (app, services) {
    build.create(app, services.get('build'));
    logfile.create(app, services.get('logfile'));
};