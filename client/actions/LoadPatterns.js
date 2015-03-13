'use strict';

var PatternAPI = require('../services/PatternAPI');

module.exports = function (context, payload, done) {
    console.log('Loading patterns payload: ' + require('util').inspect(payload))
    PatternAPI.read(payload.params, function (err, patterns) {
        context.dispatch('RECEIVE_PATTERNS', patterns);
        done();
    });
};
