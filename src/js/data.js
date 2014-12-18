module.exports = {

    init: function() {
        localStorage.clear();
        localStorage.setItem('patterns', JSON.stringify([
            {
                id: 'm_1',
                name: 'Jing and Bill',
                html: 'Hey Jing, want to give a Flux talk at ForwardJS?',
                timestamp: Date.now() - 99999
            },
            {
                id: 'm_2',
                name: 'Bill',
                html: 'Seems like a pretty cool conference.',
                timestamp: Date.now() - 89999
            },
            {
                id: 'm_3',
                name: 'Jing',
                html: 'Sounds good.  Will they be serving dessert?',
                timestamp: Date.now() - 79999
            }
        ]));
    }
};
