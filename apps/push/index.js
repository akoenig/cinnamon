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

var path = require('path'),
    child = require('child_process'),
    colors = require('colors');

function PushApplication (config) {
    this.config = config;
}

PushApplication.prototype.execute = function execute (args) {
    var that       = this,
        remote     = args[0] || 'origin',
        branch     = args[1] || 'master',
        repository = path.basename(process.cwd()) + '.git',
        endpoint   = this.config.push.endpoint + '/' + repository;

    console.log((this.config.pkg.name + ' (v' + this.config.pkg.version + ') push application. \n').green.bold);
    console.log(('INFO: Pushing to main repository ' + remote + '@' + branch + ' ...').green.bold);

    child.exec('git push ' + remote + ' ' + branch, function callback (err, stdout, stderr){
        if (err) {
            console.log(stderr.red);

            process.exit(1);
        }

        console.log(stderr.green);
        console.log(stdout.green);

        console.log('\n');
        console.log(('INFO: Pushing to ' + that.config.pkg.name + ' server ...').green.bold);

        child.exec('git push ' + endpoint + ' ' + branch, function (err, stdout, stderr) {
            if (err) {
                console.log(stderr.red);
                process.exit(1);
            }

            console.log(stderr.green);
            console.log(stdout.green);

            console.log('INFO: DONE! :)'.green.bold);
        });
    });
};

exports.init = function (config) {
    return new PushApplication(config);
};