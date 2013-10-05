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
 * Sorts a list.
 *
 * @param {array} list The list which should be sorted.
 *
 */
exports.sort = function (list) {
    
    return {
        /**
         * Sorts the list by a given property.
         *
         * @param {string} property The property name that is responsible for the sorting.
         * @param {boolean|undefined} desc A descending order?
         *
         */
        by : function (property, desc) {
            list = list.sort(function (a, b) {
                var result = (a[property] > b[property]) ? -1 : 1;

                return (desc) ? -(result) : result;
            });
        }
    };
};