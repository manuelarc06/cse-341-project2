const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");

const mongodb = require('./data/database.js');

const app = express();

app.use('/', require('./routes'));

const port = process.env.PORT || 3001;

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Database is listening and node running on port ${port}`) });
    }
});
