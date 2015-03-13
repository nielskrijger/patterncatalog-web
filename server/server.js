'use strict';

require('node-jsx').install()

var express = require('express');
var exphbs = require('express-handlebars');
var compression = require('compression');
var bodyParser = require('body-parser');
var React = require('react');
var path = require('path');
var Router = require('react-router');
var async = require('async');
var expressState = require('express-state');
var config = require('./lib/config');
var app = require('../client/app');

var server = express();

server.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views'
}));
server.set('view engine', '.hbs');
server.set('views', __dirname + '/views');
server.disable('etag');

server.use(compression());
server.use(bodyParser.json());

console.log('Starting ' + config.get('env') + ' server');

var assets = __dirname + '/' + config.get('assets');
server.use('/assets', express.static(assets));
console.log('Serving assets from directory ' + assets);

expressState.extend(server);

server.use(function (req, res, next) {
    var context = app.createContext({
        api: config.get('api'),
        env: config.get('env')
    });

    Router.run(app.getAppComponent(), req.url, function (Handler, state) {
        if (state.routes.length === 0) {
            res.status(404);
        }

        async.filterSeries(
            state.routes.filter(function(route) {
                return route.handler.loadAction ? true : false;
            }),
            function(route, done) {
                var actionPayload = {
                    params: state.params,
                    query: state.query
                };
                context.getActionContext().executeAction(route.handler.loadAction, actionPayload, done);
            },
            function() {
                console.log('Rendering application components');
                var markup = React.renderToString(React.createElement(Handler, {
                    context: context.getComponentContext()
                }));
                res.expose(app.dehydrate(context), app.stateElement);
                res.render('home', {
                    minified: config.get('minified'),
                    html: markup
                }, function (err, markup) {
                    if (err) {
                        next(err);
                    }
                    res.send(markup);
                });
            }
        );
    });
});

server.listen(config.get('port'), function() {
    var host = this.address().address;

    console.log('Application listening on http://%s:%s', host, config.get('port'));
});
