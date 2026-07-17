const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const app = express();

app.use('/', require('./routes'));

const port = process.env.PORT || 3001;

app.listen(port, () => { console.log(`Running on port ${port}`) });