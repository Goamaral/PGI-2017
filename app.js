const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port);

console.log('Server running on ' + port);
