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

function BuildsAPI (service) {
    this.service = service;
}

BuildsAPI.prototype.list = function list (req, res) {
    this.service.findAll().then(
        function success (builds) {
            res.json(200, builds);
        },
        function failure (err) {
            res.json(500, err);
        }
    );
};

/**
 * API for removing a build.
 *
 * @param {object} req The request object.
 * @param {object} res The request object.
 *
 */
BuildsAPI.prototype.remove = function remove (req, res) {
    var id = req.params.id;

    this.service.remove(id).then(
        function success () {
            res.send(200);
        },
        function failure (err) {
            res.json(500, err);
        }
    );
};

exports.create = function (app, service) {
    var api = new BuildsAPI(service);

    app.get('/api/builds', api.list.bind(api));
    app.del('/api/builds/:id', api.remove.bind(api));
};