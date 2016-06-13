import express = require('express');

import routes = require('./index2');

var router: express.Router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/index', routes.index);
router.get('/contact', routes.contact);
router.get('/about', routes.about);

export = router;