const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize, dbInstance} = require('./models');
const getProfile = require('./middleware/getProfile')
const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
app.set('sequelize', Sequelize)
app.set('models', dbInstance.models)

app.use(express.json());
app.use(getProfile);
app.use(routes);


// app.use(function (req, res, next) {
//     next(createError(404));
// });
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
