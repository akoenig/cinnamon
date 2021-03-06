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

var fs              = require('fs'),
    path            = require('path'),
    stripcolorcodes = require('stripcolorcodes');

function LogfileDAO (db, config) {
    this.db = db;
    this.config = config;
}

LogfileDAO.prototype.findByDirectory = function findByDirectory (directory, callback) {
    var file = path.join(this.config.data.work, directory, 'cinnamon.log');

    fs.readFile(file, function (err, content) {
        if (err) {
            // Not found
            if (34 === err.errno) {
                return callback();
            } else {
                return callback(err);
            }
        }

        content = stripcolorcodes(content.toString());

        return callback(null, content);
    });
};

/**
 * DOCME
 *
 */
exports.create = function (db, config) {
    return new LogfileDAO(db, config);
};