'use strict';

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
    mixins: [Router.State],

    render: function () {
        return (
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="/">
                        <img src="/assets/img/logo.png" width="171" height="22" />
                    </a>
                </li>
                <li>
                    <Link to="/"><i className="fa fa-fw fa-home"></i>&nbsp; Home</Link>
                </li>
                <li>
                    <Link to="composer"><i className="fa fa-fw fa-plus"></i>&nbsp; Create pattern</Link>
                </li>
            </ul>
        );
    }
});
