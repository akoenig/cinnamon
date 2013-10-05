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

var promise = require('../utilities/promise');

function LogfileService (dao) {
    this.dao = dao;
}

LogfileService.prototype.findByDirectory = function findByDirectory (directory) {
    var deferred = promise.defer();

    this.dao.findByDirectory(directory, function (err, logfile) {
        if (err) {
            return deferred.reject(err);
        }

        return deferred.resolve(logfile);
    });

    return deferred.promise;
};

exports.create = function (logfileDAO) {
    return new LogfileService(logfileDAO);
};