require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { routes } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errors');
const { limiter } = require('./middlewares/rateLimiter');
const { DB_LOCAL_PATH } = require('./utils/config');

const { PORT = 3001, NODE_ENV, DB_PATH } = process.env;

const app = express();

app.use(cors({
  origin: [
    'https://movies.front.fmn.nomoredomains.club',
    'http://movies.front.fmn.nomoredomains.club',
    // 'http://localhost:3000',
    // 'http://localhost:3001',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DB_PATH : DB_LOCAL_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
}

main();
