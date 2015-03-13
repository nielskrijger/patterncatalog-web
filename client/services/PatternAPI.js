'use strict';

var request = require('superagent');

module.exports = {

    read: function(params, callback) {
        console.log('TESTSETSETSE');
        request
            .get('/api/patterns')
            .set('Accept', 'application/json')
            .end(function(error, res){
                console.log("TEST")
                console.log(error);
                console.log(res.body);
                callback(null, JSON.parse(JSON.stringify(res.body)));
            });
    },

    get: function(id, callback) {
        var result = data.filter(function(elm) {
            return elm.id == id;
        });
        callback(null, JSON.parse(JSON.stringify(result)));
    },

    create: function(params, callback) {
        data.push({
            name: params.name,
            markdown: params.markdown,
            timestamp: params.timestamp
        });
        callback(null, data);
    }
};
