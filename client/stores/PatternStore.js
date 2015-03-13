'use strict';
var createStore = require('dispatchr/utils/createStore');

module.exports = createStore({
    storeName: 'PatternStore',
    handlers: {
        'RECEIVE_PATTERNS': 'receivePatterns',
        'CREATE_PATTERN_START': 'createPatternStart',
        /*
        'CREATE_TODO_FAILURE': '_createTodoFailure',
        'CREATE_TODO_SUCCESS': '_createTodoSuccess',
        'UPDATE_TODO_START': '_updateTodoStart',
        'UPDATE_TODO_SUCCESS': '_updateTodoSuccess',
        'DELETE_TODO_SUCCESS': '_receiveTodos',
        'TOGGLE_ALL_TODO_SUCCESS': '_receiveTodos'*/
    },

    initialize: function () {
        this.patterns = {};
    },

    getAll: function () {
        return this.patterns;
    },

    getAllArray: function() {
        var newArray = []; // Array-types are sorted, objects are not
        Object.keys(this.patterns).forEach(function (key) {
            newArray.push(this.patterns[key]);
        }.bind(this));
        return newArray;
    },

    getAllChrono: function() {
        var orderedPatterns = this.getAllArray();
        orderedPatterns.sort(function(a, b) {
            if (a.created < b.created) {
                return -1;
            } else if (a.created > b.created) {
                return 1;
            }
            return 0;
        });
        return orderedPatterns;
    },

    getBySlug: function(slug) {
        // TODO: inefficient, replace this with Array.prototype.find when moving to ES6
        return this.getAllArray().filter(function(el) {
            return el.slug == slug;
        })[0];
    },

    receivePatterns: function (patterns) {
        console.log('Received patterns!!! ' + patterns)
        patterns.forEach(function (pattern) {
            this.patterns[pattern.id] = pattern;
        }.bind(this));
        this.emitChange();
    },

    createPatternStart: function(pattern) {
        this.patterns.push(pattern);
        this.emitChange();
    },

    dehydrate: function () {
        return {
            patterns: this.patterns
        };
    },

    rehydrate: function (state) {
        this.patterns = state.patterns;
    }
});
