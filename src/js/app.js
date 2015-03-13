var React = require('react');
var PatternAPI = require('./utils/PatternAPI')
var FluxCartApp = require('./components/FluxCartApp.react');

// Load Mock Product Data into localStorage
ProductData.init();

// Load Mock API Call
CartAPI.getProductData();

// Render FluxCartApp Controller View
React.render(
    <FluxCartApp />,
    document.getElementById('flux-cart')
);
