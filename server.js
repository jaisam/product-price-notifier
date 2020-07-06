var express = require('express');
var fs = require('fs');
require('dotenv').config();
var Cronjob = require('./utils/cronjob');

var app = express();

app.listen(process.env.PORT, () => {
    console.log(`Connected to Port ${process.env.PORT}`);
});

// Fetches Data from e-commerce website and sends mail
new Cronjob().jobScheduler();
