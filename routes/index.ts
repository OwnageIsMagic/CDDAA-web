import * as express from 'express';

let router :express.Router = express.Router();

// /* GET home page. */
router.get('/', function (req, res, next) {
    //res.sendStatus(600);
    //console.log(res.message);
    //res.send('hi');
    //next();
    res.render('index', { title: 'Express' });
});

router.get('/warships', (req, res) => res.render('warship') );

export = router;
