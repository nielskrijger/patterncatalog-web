var PatternActions = require('../actions/PatternActions');

module.exports = {

    getAll: function() {
        var data = JSON.parse(localStorage.getItem('patterns'));
        PatternActions.receivePatterns(data);
    },

    create: function(pattern) {
        var patterns = JSON.parse(localStorage.getItem('patterns'));
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        patterns.push({
            id: id,
            name: pattern.name,
            markdown: pattern.markdown
        });
        localStorage.setItem('patterns', JSON.stringify(patterns));

        // simulate success callback
        setTimeout(function() {
            PatternActions.receiveCreatedMessage(createdMessage);
        }, 0);
    }

};
