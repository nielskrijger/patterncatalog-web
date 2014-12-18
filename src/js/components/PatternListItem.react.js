var React = require('react');

var ReactPropTypes = React.PropTypes;

var PatternListItem = React.createClass({

    propTypes: {
        pattern: ReactPropTypes.object.isRequired
    },

    render: function() {
        return (
            <li className="pattern-list-item">
                <h5 className="pattern-name">{this.props.pattern.name}</h5>
            </li>
        );
    }

});

module.exports = PatternListItem;
