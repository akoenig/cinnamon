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

var levelup  = require('levelup'),
    BuildDAO = require('./build'),
    LogfileDAO = require('./logfile');

exports.init = function (config) {
    var db = levelup(config.database),
        daos = {};

    daos.build = BuildDAO.create(db, config);
    daos.logfile = LogfileDAO.create(db, config);

    return {
        get : function get (type) {
            return daos[type];
        }
    };
};