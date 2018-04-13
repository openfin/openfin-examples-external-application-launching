const express = require('express');
const path = require('path');
const openfinLauncher = require('openfin-launcher');

var app = express();

app.use(express.static(path.join(__dirname, 'src')));

var port = 9966;

app.listen(port, function(){
    console.log('Express server listening on port ' + port);
    openfinLauncher.launchOpenFin({
        configPath: `http://localhost:${port}/local-app.json`
    }).then(() => {
        process.exit();
    });
});
