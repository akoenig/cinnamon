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

var fs   = require('fs'),
    os   = require('os'),
    path = require('path');

/**
 * DOCME
 *
 */
function Config (name) {
    this.file = path.join(this.$$getHomeDirectory(), '.' + name + 'rc');
}

/**
 * Returns the users home in an OS-agnostic way.
 *
 * @return {string} Path to the users home.
 *
 */
Config.prototype.$$getHomeDirectory = function $$getHomeDirectory () {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};

/**
 * DOCME
 *
 */
Config.prototype.read = function read (callback) {
    var that = this;

    function $$read () {

        fs.readFile(that.file, function (err, content) {
            if (err) {
                return callback(err);
            }

            try {
                content = JSON.parse(content);
            } catch (err) {
                return callback(err);
            }

            return callback(null, content);
        });
    }

    fs.exists(this.file, function (exists) {
        if (!exists) {
            fs.createReadStream(path.join(__dirname, 'default.json'))
               .pipe(fs.createWriteStream(that.file))
               .on('finish', $$read);
        } else {
            $$read();
        }
    });
};

exports.read = function (name, callback) {
    var config = new Config(name);

    config.read(callback);
};