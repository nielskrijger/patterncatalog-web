'use strict';

var React = require('react');
var Router = require('react-router');
var app = require('./app');

window.React = React; // For chrome dev tool support
var dehydratedState = window[app.stateElement];

console.log('DehydratedState: ' + require('util').inspect(dehydratedState));

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        error(err);
        return;
    }

    Router.run(app.getAppComponent(), Router.HistoryLocation, function (Handler, state) {
        console.log('State: ' + require('util').inspect(state));
        React.render(
            React.createElement(
                Handler,
                { context: context.getComponentContext() }
            ),
            document.getElementById('app')
        );
    });
});
