'use strict';

var React = require('react');
var Router = require('react-router');
var StoreMixin = require('fluxible-app').StoreMixin;
var PatternStore = require('../stores/PatternStore');

module.exports = React.createClass({
    mixins: [StoreMixin, Router.State],
    statics: {
        storeListeners: [PatternStore],
        loadAction: require('../actions/LoadPattern'),
    },

    getPatternState: function () {
        var slug = this.getParams().slug;
        var store = this.props.context.getStore(PatternStore);
        return {
            pattern: store.getBySlug(slug)
        };
    },

    getInitialState: function() {
        return this.getPatternState();
    },

    render: function() {
        var pattern = this.state.pattern;
        return (
            <div className="pattern">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">{pattern.name}</h1>

                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {pattern.html}
                    </div>
                </div>
            </div>
        );
    },

    onChange: function() {
        this.setState(this.getPatternState());
    }
});
