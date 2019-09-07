/**
 * Module dependencies.
 */
const express = require('express'),
i18n = require("i18n");
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
var cors = require('cors')
const sequelize = require('./config/db');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

// intialize I18n
i18n.configure({
  locales:['en'],
  directory: __dirname + '/locales'
});

/**
 * Create Express server.
 */
const app = express();
app.use(cors())
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send(' API 🧐 is running  🤩🎉'));
app.use('/api/task', require('./api/task'));
/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({
  type: "*/*"
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
