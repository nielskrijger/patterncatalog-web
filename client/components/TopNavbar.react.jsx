'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
    mixins: [Router.State],

    render: function () {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle toggle-left hidden-md hidden-lg" data-toggle="sidebar" data-target=".sidebar-left">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Project name</Link>
                    </div>
                </div>
            </nav>
        );
    }
});
