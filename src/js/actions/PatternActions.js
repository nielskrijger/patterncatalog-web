var AppDispatcher = require('../dispatcher/AppDispatcher');
var PatternConstants = require('../constants/PatternConstants');

var PatternActions = {

    receivePatterns: function(data) {
        AppDispatcher.handleAction({
            type: PatternConstants.RECEIVE_PATTERNS,
            data: data
        });
    },

    receiveCreatedPattern: function(pattern) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_CREATED_PATTERN,
            data: pattern
        });
    },

    createPattern: function(pattern) {
        AppDispatcher.handleAction({
            type: PatternConstants.PATTERN_CREATE,
            data: pattern
        });
    },

    removePattern: function(sku) {
        AppDispatcher.handleAction({
            type: PatternConstants.PATTERN_REMOVE,
            data: pattern
        });
    }
};

module.exports = PatternActions;
