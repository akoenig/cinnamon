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

var apps   = require('./apps/'),
    config = require('./config/'),
    path   = require('path'),
    pkg    = require('./package.json');

exports.init = function (callback) {
    config.read(pkg.name, function done (err, config) {
        if (err) {
            return console.log('Error while reading configuration. ' + err);
        }

        //
        // Load the package.json as meta information.
        //
        config.pkg = pkg;

        //
        // Set the process title to the apps name.
        //
        process.title = config.pkg.name;

        //
        // Init the apps.
        //
        apps = apps.init(config);

        callback(apps);
    });
}; 