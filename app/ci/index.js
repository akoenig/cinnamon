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

var http   = require('http'),
    cicada = require('cicada');

exports.init = function (config, services) {

    var ci = cicada(config.data.root),
        service = services.get('build');

    ci.on('commit', function (commit) {
        var build = {};

        build.directory  = commit.id;
        build.repository = commit.repo;
        build.commit     = commit.hash;
        build.branch     = commit.branch;
        build.running    = true;

        service.add(build).then(
            function success (build) {
                commit.run('test').on('exit', function (code) {
                    build.success = !code;
                    build.running = false;

                    service.update(build.id, build).then(
                        function success () {
                            console.log(Date.now() + ': Updated build: ' + JSON.stringify(build));
                        },
                        function failure () {
                            // TODO: Implement logging.
                            console.log(Date.now() + ': Failed to save build ' + build.commit + '@' + build.repo);                            
                        }
                    );
                });
            },
            function failure () {
                // TODO: Implement logging.
                console.log(Date.now() + ': Failed to save build ' + build.commit + '@' + build.repo);
            }
        );
    });

    http.createServer(ci.handle).listen(config.environment.ci);
};