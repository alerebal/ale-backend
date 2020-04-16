const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');


// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3100);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api', require('./routes/projects.routes'));
app.use('/api', require('./routes/messages.routes'));
app.use('/api', require('./routes/studies.routes'));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.resolve(__dirname, 'public')))


module.exports = app;