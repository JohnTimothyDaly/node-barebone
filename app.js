var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport       = require('passport');
var mongoose       = require('mongoose');
var hbs            = require('express3-handlebars');

var app            = express();
var port           = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/barebone')

app.engine('.hbs', hbs({defaultLayout: 'application',
                        extname:       '.hbs',
                        layoutDir:     'app/views'}));

app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login');
app.post('/login', passport.authenticate('local', {successRedirect: '/',
                                                   failureRedirect: '/login'}));

app.listen(8080);
