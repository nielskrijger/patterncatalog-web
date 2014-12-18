var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PatternConstants = require('../constants/PatternConstants');
var _ = require('underscore');

var _patterns = {};

function loadPatternData(data) {
    _patterns = data;
}

var PatternStore = _.extend({}, EventEmitter.prototype, {

    getPatterns: function() {
        console.log(_patterns);
        return _patterns;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case PatternConstants.RECEIVE_PATTERNS:
            loadPatternData(action.data);
            break;
        default:
            return true;
    }

    PatternStore.emitChange(); // If action was responded to, emit change event
    return true;
});

module.exports = PatternStore;
