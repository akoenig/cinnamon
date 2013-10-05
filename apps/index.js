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

var push = require('./push'),
  server = require('./server');

exports.init = function (config) {

    var apps = {};

    apps.push = push.init(config);
    apps.server = server.init(config);

    return {
        get : function (name) {
            return apps[name];
        }
    };
};