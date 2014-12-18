var React = require('react');

var PatternData = require('./data');
var PatternAPI = require('./utils/PatternAPI');
var PatternList = require('./components/PatternList.react');

// Load Mock Product Data into localStorage
PatternData.init();
PatternAPI.getAll();

React.render(
    <div>Test <PatternList /></div>,
    document.getElementById('patternapp')
);
