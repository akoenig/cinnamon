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

var path   = require('path'),
    pkg    = require('./package.json'),
    config = {};

//
// Load the package.json as meta information.
//
config.pkg = require('./package.json');

//
// Set the process title to the apps name.
//
process.title = config.pkg.name;

//
// Load the configuration
//
try {
    config.environment = require('./config/environment.json');
} catch (e) {
    console.log('Failed to load configuration: ' + e);

    process.exit(1);
}

//
// Init the path to the cicada data path.
//
config.data = {};
config.data.root = path.join('.', 'data');
config.data.repo = path.join(config.data.root, 'repo');
config.data.work = path.join(config.data.root, 'work');

//
// Init the path to the database.
//
config.database = path.join('.', 'db');

//
// Configure the path to the web frontend.
//
config.frontend = {};
config.frontend.root = path.join('.', 'public');
config.frontend.index = path.join(config.frontend.root, 'index.html');

//
// Boot ...
//
require('./app/')(config);