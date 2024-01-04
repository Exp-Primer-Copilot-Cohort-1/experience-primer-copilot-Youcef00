// Create a web server
// 1. Create a web server
// 2. Create a route for /comments
// 3. Send back some json (array of comments)
// 4. Test your work!

const express = require('express');
const app = express();

app.get('/comments', (req, res) => {
    res.send([{
        name: 'Andrew',
        comment: 'This is a comment'
    }, {
        name: 'Mike',
        comment: 'This is a comment'
    }]);
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});