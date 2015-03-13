'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('../client/components/App.react.jsx');
var PatternList = require('../client/components/PatternList.react.jsx');
var Pattern = require('../client/components/Pattern.react.jsx');
var Composer = require('../client/components/Composer.react.jsx');
var NotFound = require('../client/components/NotFound.react.jsx');

module.exports = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={PatternList} />
        <Route name="patterns" path="/patterns" handler={PatternList} />
        <Route name="pattern" path="/patterns/:slug" handler={Pattern} />
        <Route name="composer" path="/compose" handler={Composer} />
        <NotFoundRoute handler={NotFound}/>
    </Route>
);
