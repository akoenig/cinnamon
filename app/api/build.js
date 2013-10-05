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
function BuildsAPI (service) {
    this.service = service;
}

/**
 * DOCME
 *
 */
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

exports.create = function (app, service) {
    var api = new BuildsAPI(service);

    app.get('/api/builds', api.list.bind(api));
};