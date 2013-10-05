/*
 * cinnamon
 *
 * A continuous integration server on top of substacks cicada.
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

var express  = require('express'),
    api      = require('./api/'),
    ci       = require('./ci/'),
    daos     = require('./daos/'),
    services = require('./services/');

module.exports = function (config) {

    'use strict';

    var app;

    //
    // Init the DAOs
    //
    daos = daos.init(config.database, config);

    //
    // Init the service layer.
    //
    services = services.init(daos);

    //
    // Init the CI server.
    //
    ci.init(config, services);

    //
    // Init the web module.
    //
    app = express();
    app.use(express.static(config.frontend.root));
    app.listen(config.environment.port, config.environment.host);

    app.get('/', function (req, res) {
        res.sendFile(config.frontend.index);
    });

    //
    // Init the API.
    //
    api.init(app, services);

    console.log('%s is running (web: %d / ci: %d)', config.pkg.name, config.environment.port, config.environment.ci);
};