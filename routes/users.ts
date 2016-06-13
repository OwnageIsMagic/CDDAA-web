import * as express from 'express';
let router: express.Router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/index', function index(req: express.Request, res: express.Response)
{
    res.render('index2', { title: 'Express', year: new Date().getFullYear() });
});
    
router.get('/about', function about(req: express.Request, res: express.Response)
{
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
});
router.get('/contact', function contact(req: express.Request, res: express.Response)
{
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
});

export = router;