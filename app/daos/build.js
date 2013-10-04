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

var sorter = require('../utilities/sorter');

/**
 * DOCME
 *
 */
function BuildDAO (db) {
    this.db = db;
    this.namespace = 'build!';
}

/**
 * DOCME
 *
 */
BuildDAO.prototype.add = function add (build, callback) {
    var key = this.namespace + build.commit,
        now = Date.now();

    build.id = key;

    // Add the current date (UNIX timestamp).
    build.created = now;
    build.modified = now;

    this.db.put(key, JSON.stringify(build), {sync: true}, function () {
        callback(null, build);
    });
};

/**
 * DOCME
 *
 */
BuildDAO.prototype.update = function update (key, build, callback) {
    var now = Date.now();

    build.id = key;

    if (!build.modified) {
        // Add the current date (UNIX timestamp).
        build.modified = now;
    }

    this.db.put(key, JSON.stringify(build), {sync: true}, function () {
        callback(null, build);
    });
};

/**
 * DOCME
 *
 */
BuildDAO.prototype.findAll = function findAll (callback) {
    var that   = this,
        builds = [];

    function $$finalize (err) {
        if (err) {
            return callback(err);
        }

        sorter.sort(builds).by('created');

        callback(null, builds);
    }

    this.db.createReadStream({
        start: that.namespace,
        end: that.namespace + '\xff'
    })
    .on('data', function (data) {
        var build = JSON.parse(data.value);
        build.id = data.key;

        builds.push(build);
    })
    .on('error', $$finalize)
    .on('close', $$finalize);
};

/**
 * DOCME
 *
 */
exports.create = function (db) {
    return new BuildDAO(db);
};