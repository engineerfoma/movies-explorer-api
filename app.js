require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { routes } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, DB_PATH } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DB_PATH : 'mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
}

main();
