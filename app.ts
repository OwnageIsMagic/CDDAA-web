import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import logger = require('morgan');

var debug = require('debug')('CDDAAndroid:app.ts');

let app = express();

import routes = require('./routes/index');
import users = require('./routes/users');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('x-powered-by', 'false');
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);

// uncomment after placing your favicon in /public
app.use('/favicon.ico', favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static'), { fallthrough: false, index: false }));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function notRoutedHandler (req, res, next) {
    let err = new Error('Not Found');
    err['status'] = 404;
    debugger; //HACK
    next(err);
    //res.render('error');
});

// error handlers
app.use(function staticNotFound(err: any, req: express.Request, res: express.Response, next: express.NextFunction): void
{
    //process.stdout.write('\x1B[2J');
    //debug(req._parsedUrl);
    if (err.code === 'ENOENT' && req.url.indexOf('/static/', 0) === 0  )
    {
        //console.dir(err);
        res.status(404).end();
        return;
    }
    debugger; //HACK
    next();
    //console.log(req.baseUrl.startsWith('/static'));
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function devErrorHandler (err: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.status(err.status || 500);
        res.render('error', {
            statusCode: err.status,
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function errorHandler (err: any, req: express.Request, res: express.Response, next: express.NextFunction): void  {
        res.status(err.status || 500);
        res.render('error', {
            statusCode: err.status,
            message: err.message,
            error: {}
        });
    });
}
//NODE_ENV=production
if (app.get('env') === 'development') {
    //import
    let dbgPanel = require('express-debug');
    dbgPanel(app, { panels: ['locals', 'request', 'session', 'template', 'software_info', /*'profile',*/'other_requests', 'nav'] });
}

debug('app.ts completed');
module.exports = app;
