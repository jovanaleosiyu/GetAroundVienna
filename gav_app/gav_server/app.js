const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();
require('colors');

const indexRouter = require('./routes/index');
const { errorHandler, notFoundHandler } = require('./middleware/errorhandler');

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', indexRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT} ...`));
