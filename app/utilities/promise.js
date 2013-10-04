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
 * The Deferred pattern.
 *
 */
function Deferred () {
    var that = this;

    that.resolveQueue = [];
    that.rejectQueue = [];

    that.promise = {
        then : function (success, failure) {
            that.$$success = success;
            that.$$failure = failure;

            if (that.resolveQueue.length) {
                that.resolveQueue.forEach(function (data) {
                    that.$$success(data);
                });

                that.resolveQueue = [];
            }

            if (that.rejectQueue.length) {
                that.rejectQueue.forEach(function (data) {
                    that.$$failure(data);
                });

                that.rejectQueue = [];
            }
        }
    };
}

/**
 * Resolves the actual deferred.
 *
 * @param {*} data The data that should be passed to the success callback.
 *
 */
Deferred.prototype.resolve = function (data) {
    if (typeof this.$$success === 'function') {
        this.$$success(data);
    } else {
        this.resolveQueue.push(data);
    }
};

/**
 * Rejects the actual deferred.
 *
 * @param {*} data The data that should be passed to the failure callback.
 *
 */
Deferred.prototype.reject = function (err) {
    if (typeof this.$$failure === 'function') {
        this.$$failure(err);
    } else {
        this.rejectQueue.push(err);
    }
};

exports.defer = function () {
    return new Deferred();
};