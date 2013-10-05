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
    fs     = require('fs'),
    rimraf = require('rimraf'),
    sorter = require('../utilities/sorter');

function BuildDAO (db, config) {
    this.db = db;
    this.config = config;
    this.namespace = 'build!';
}

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

BuildDAO.prototype.remove = function (key, callback) {
    var that = this;

    this.db.get(key, function (err, build) {
        if (err) {
            return callback(err);
        }

        try {
            build = JSON.parse(build);
        } catch (err) {
            return callback(err);
        }

        rimraf(path.join(that.config.data.work, build.directory), function (err) {
            if (err) {
                return callback(err);
            }

            that.db.del(build.id, callback);
        });
    });
};

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

exports.create = function (db, config) {
    return new BuildDAO(db, config);
};