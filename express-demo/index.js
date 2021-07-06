const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const books = require('./routes/books');
const home = require('./routes/home');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.set('view engine', 'push');
app.set('views', '/view');
app.use('/api/books', books);
app.use('/', home);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Logger ishlayabdi...');
}

app.use(logger.nameAuth);
app.use(helmet());
console.log(config.get('name'));
console.log(config.get('mailserver.host'));
console.log(config.get('mailserver.password'));
//console.log(process.env.NODE_ENV);
//console.log(app.get('env'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`${port} chi portni eshitishni boshladim`);
});