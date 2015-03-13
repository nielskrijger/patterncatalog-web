'use strict';

var React = require('react');
var Router = require('react-router');
var StoreMixin = require('fluxible-app').StoreMixin;
var PatternStore = require('../stores/PatternStore');
var Link = Router.Link;

module.exports = React.createClass({
    mixins: [StoreMixin],
    statics: {
        storeListeners: [PatternStore],
        loadAction: require('../actions/LoadPatterns'),
    },

    getInitialState: function () {
        return this.getPatternListState();
    },

    getPatternListState: function() {
        var store = this.props.context.getStore(PatternStore);
        return {
            patterns: store.getAllChrono()
        };
    },

    render: function() {
        console.log("State: " + require('util').inspect(this.state))
        var items = this.state.patterns.map(function(pattern) {
            return (
                <li className="pattern-list-item" key={pattern.id}>
                    <Link to="pattern" key={pattern.id} params={pattern}>{pattern.name}</Link>
                </li>
            );
        });

        return (
            <div className="pattern-list">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">New patterns</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="patterns">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        );
    },

    onChange: function() {
        this.setState(this.getPatternListState());
    }
});
