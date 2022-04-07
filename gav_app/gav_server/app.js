const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

require('dotenv').config();
require('colors');

const accountRouter = require('./routes/account');
const tripRouter = require('./routes/trip');
const pointsRouter = require('./routes/points');
const favoritesRouter = require('./routes/favorites');
const plannerRouter = require('./routes/planner');
const { errorHandler, notFoundHandler } = require('./middleware/errorhandler');
const { restrict } = require('./middleware/restrict');

const app = express();

const { PORT, NODE_ENV, SESSION_NAME, SESSION_SECRET, CLIENT } = process.env;

app.use(
  cors({
    origin: CLIENT,
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(helmet());
app.use(
  session({
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: false,
      sameSite: true,
      secure: NODE_ENV === 'production',
    },
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use('/', accountRouter);
app.use('/trip', tripRouter);
app.use('/points', pointsRouter);
app.use(restrict);
app.use('/favorites', favoritesRouter);
app.use('/plannerentry', plannerRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT ?? 3000, () => console.log(`Listening on Port ${PORT} ...`));
