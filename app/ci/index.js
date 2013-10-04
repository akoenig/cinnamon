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
        console.log(commit);
        var build = {};

        build.directory  = commit.id;
        build.repository = commit.repo;
        build.commit     = commit.hash;
        build.branch     = commit.branch;

        service.add(build).then(
            function success (build) {
                commit.run('test').on('exit', function (code) {
                    build.success = !code;

                    service.update(build.id, build).then(
                        function success () {
                            console.log('Updated build: ' + JSON.stringify(build));
                        },
                        function failure () {
                            // TODO: Implement logging.
                            console.log('Failed to save build ' + build.commit + '@' + build.repo);                            
                        }
                    );
                });
            },
            function failure () {
                // TODO: Implement logging.
                console.log('Failed to save build ' + build.commit + '@' + build.repo);
            }
        );
    });

    http.createServer(ci.handle).listen(config.environment.ci);
};