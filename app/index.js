/*
 * cinnamon
 *
 * A continuous integration server on top of substacks cicada.
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

var ci       = require('./ci/'),
    daos     = require('./daos/'),
    services = require('./services/');

module.exports = function (config) {

    'use strict';

    //
    // Init the DAOs
    //
    daos = daos.init(config.database);

    //
    // Init the service layer.
    //
    services = services.init(daos);

    //
    // Init the CI server.
    //
    ci.init(config, services);

    console.log('%s is running (web: %d/ ci: %d)', config.pkg.name, config.environment.port, config.environment.ci);
};