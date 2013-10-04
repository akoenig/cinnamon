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

/**
 * DOCME
 *
 */
function BuildService (dao) {
    this.dao = dao;
}

/**
 * DOCME
 *
 */
BuildService.prototype.add = function add (build) {
    var deferred = promise.defer();

    build.created = Date.now();

    this.dao.add(build, function (err, build) {
        if (err) {
            return deferred.reject(err);
        }

        return deferred.resolve(build);
    });

    return deferred.promise;
};

/**
 * DOCME
 *
 */
BuildService.prototype.update = function update (id, build) {
    var deferred = promise.defer();

    this.dao.update(id, build, function (err, updatedBuild) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(updatedBuild);
    });

    return deferred.promise;
};

/**
 * DOCME
 *
 */
BuildService.prototype.findAll = function findAll () {
    var deferred = promise.defer();

    this.dao.findAll(function (err, builds) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(builds);
    });

    return deferred.promise;  
};

/**
 * DOCME
 *
 */
exports.create = function (buildDAO) {
    return new BuildService(buildDAO);
};