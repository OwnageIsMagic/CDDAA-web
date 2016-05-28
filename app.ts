import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import logger = require('morgan');
import debug = require('debug');

debug('CDDAAndroid:app.js');

import routes = require('./routes/index');
var users = require('./routes/users');
let app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('jade', require('pug').__express);
app.set('x-powered-by', 'false');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function notRoutedHandler (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
    //res.render('error');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function devErrorHandler (err: any, req: express.Request, res: express.Response, next: express.NextFunction): any {
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
    app.use(function errorHandler (err: any, req: express.Request, res: express.Response, next: express.NextFunction): any  {
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
    var dbgPanel = require('express-debug');
    dbgPanel(app, { panels: ['locals', 'request', 'session', 'template', 'software_info', /*'profile',*/'other_requests', 'nav'] });
}

debug('app.js completed');
module.exports = app;
