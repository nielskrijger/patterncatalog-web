'use strict';

var React = require('react');
var Router = require('react-router');
var StoreMixin = require('fluxible-app').StoreMixin;
var markdown = require( "markdown" ).markdown;
var PatternStore = require('../stores/PatternStore');

var ENTER_KEY_CODE = 13;

var defaultText =
'# Context\n\
You are in a small room with your companions. Each of you is armed. The room also contains an orc. The orc has a pie.\n\n\
\
# Problem\n\
You\'re a hungry adventurer and a pie would really hit the spot right about now.\n\n\
\
# Forces\n\
 * The orc is "obviously" an evil creature, by convention.\n\
 * The orc stands between you and the pie, which you would like to have.\n\
 * The orc looks like more than a match for you, but you have the advantage of numbers.\n\n\
\
# Solution\n\
Draw your weapons and attack the orc physically, in a cooperative effort. Take the pie once the orc is dead.\n\n\
\
# Resulting Context\n\
The party is now in possession of a pie, which tastes good. The pie must be shared among surviving party members, \
which may lead to intra-party conflict. The pie may be poisoned, requiring saving throws from all who partake of it.\n\n\
\
http://c2.com/cgi/wiki?OrcKillingPattern';

module.exports = React.createClass({

    getInitialState: function() {
        return {
            name: 'Orc Killing Pattern',
            markdown: defaultText
        };
    },

    render: function() {
        console.log("Converting: " + this.state.markdown);
        var markdownToHTML = markdown.toHTML(this.state.markdown);
        return (
            <div className="compose">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="page-header">Create pattern</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" name="name" maxLength="50"
                                value={this.state.name} onChange={this._onChange} />
                        </div>
                        <div className="form-group">
                            <label>Markdown</label>
                            <textarea className="form-control" rows="20" name="markdown"
                                value={this.state.markdown} onChange={this._onChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="preview panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Preview: <span dangerouslySetInnerHTML={{__html: this.state.name}} /></h3>
                            </div>
                            <div className="panel-body" dangerouslySetInnerHTML={{__html: markdownToHTML}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function(event, value) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }
});
