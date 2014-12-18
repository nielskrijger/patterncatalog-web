var React = require('react');
var PatternListItem = require('./PatternListItem.react');
var PatternStore = require('../stores/PatternStore');

function getPatternListState() {
    var result =  {
        patterns: PatternStore.getPatterns()
    };
    console.log('Result: ', result)
    return result;
}

var PatternList = React.createClass({

    getInitialState: function() {
        return getPatternListState();
    },

    componentDidMount: function() {
        PatternStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        PatternStore.removeChangeListener(this._onChange);
    },

    render: function() {
        console.log(this.state);
        var items = this.state.patterns.map(function(pattern) {
            return (
                <PatternListItem pattern={pattern} />
            );
        });

        return (
            <ul className="pattern-app">
            {items}
            </ul>
        );
    },

    _onChange: function() {
        this.setState(getPatternListState());
    }
});

module.exports = PatternList;
