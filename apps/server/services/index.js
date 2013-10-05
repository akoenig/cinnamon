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

var BuildService = require('./build'),
    LogfileService = require('./logfile');

exports.init = function (daos) {

    var services = {};

    services.build   = BuildService.create(daos.get('build'));
    services.logfile = LogfileService.create(daos.get('logfile'));

    return {
        get : function get (type) {
            return services[type];
        }
    };
};