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

var express    = require('express'),
    fs         = require('fs'),
    util       = require('util'),
    colors     = require('colors'),
    path       = require('path'),
    api        = require('./api/'),
    integrator = require('./integrator/'),
    daos       = require('./daos/'),
    services   = require('./services/');

function ServerApplication (config) {
    this.config = config;
}

/**
 * DOCME
 *
 */
ServerApplication.prototype.execute = function execute () {

    var app;

    //
    // Set the path to the database.
    //
    this.config.database = path.join(__dirname, 'db');

    //
    // Set the path to the data directory (~/.cinnamon).
    //
    this.config.data = {};
    this.config.data.root = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.' + this.config.pkg.name);
    this.config.data.repo = path.join(this.config.data.root, 'repo');
    this.config.data.work = path.join(this.config.data.root, 'work');

    //
    // Setup the path to the web frontend.
    //
    this.config.server.frontend = {};
    this.config.server.frontend.root = path.join(__dirname, 'web');
    this.config.server.frontend.index = path.join(this.config.server.frontend.root, 'index.html');

    //
    // Try to create data directory if it does not exists.
    //
    fs.mkdir(this.config.data.root, function (err) {
        if (err && (47 === err.errno)) {
            console.log('INFO: Not necessary to create data directory. Exists..');
        }
    });

    //
    // Init the DAOs
    //
    daos = daos.init(this.config);

    //
    // Init the service layer.
    //
    services = services.init(daos);

    //
    // Init the CI server.
    //
    integrator.init(this.config, services);

    //
    // Init the web module.
    //
    app = express();
    app.use(express.static(this.config.server.frontend.root));
    app.listen(this.config.server.ports.web);

    app.get('/', function (req, res) {
        res.sendfile(this.config.server.frontend.index);
    });

    //
    // Init the API.
    //
    api.init(app, services);

    console.log((util.format('%s (v' + this.config.pkg.version + ') is running (web: %d / ci: %d)', this.config.pkg.name, this.config.server.ports.web, this.config.server.ports.integrator)).green.bold);
};

/**
 * DOCME
 *
 */
exports.init = function (config) {
    return new ServerApplication(config);
};