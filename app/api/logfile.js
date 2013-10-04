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

/**
 * DOCME
 *
 */
function LogfilesAPI (service) {
    this.service = service;
}

LogfilesAPI.prototype.findByDirectory = function findByDirectory (req, res) {
    var directory = req.params.directory;

    this.service.findByDirectory(directory).then(
        function success (content) {
            res.send(200, content);
        },
        function failure (err) {
            res.send(500, err);
        }
    );
};

exports.create = function (app, service) {
    var api = new LogfilesAPI(service);

    app.get('/api/logfiles/:directory', api.findByDirectory.bind(api));
};