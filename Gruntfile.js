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

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            files: ['Gruntfile.js', 'app.js', 'app/**/*.js', 'spec/*.js'],
            options: {
                node: true,
                strict: true,
                globals: {
                    describe: false,
                    it: false,
                    expect: false
                }
            }
        },
        'jasmine-node': {
            run: {
                spec: 'spec'
            },
            executable: './node_modules/.bin/jasmine-node'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['lint', 'jasmine_node']);
};