var React = require('react');
var Router = require('react-router');
var TopNavbar = require('./TopNavbar.react.jsx');
var Sidebar = require('./Sidebar.react.jsx');

var Link = Router.Link;
RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
    render: function() {
        return (
            <div id="wrapper">
                <div id="sidebar-wrapper">
                    <Sidebar />
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <RouteHandler context={this.props.context}/>
                    </div>
                </div>
            </div>
        );
    }
});
