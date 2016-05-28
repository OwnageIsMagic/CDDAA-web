import * as express from 'express';
//var router = new express.Router();

    var router :express.Router = express.Router();

    // /* GET home page. */
    router.get('/', function (req, res, next) {
        //res.sendStatus(600);
        //console.log(res.message);
        //res.send('hi');
        //next();
        res.render('index', { title: 'Express' });
    });

export = router;
