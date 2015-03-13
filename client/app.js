/**
 * This file is the entry point for client-side rendering.
 */

'use strict';

var FluxibleApp = require('fluxible-app');

var app = new FluxibleApp({
    appComponent: require('./routes.jsx')
});

app.stateElement = 'state';
app.registerStore(require('./stores/PatternStore.js'));

module.exports = app;
