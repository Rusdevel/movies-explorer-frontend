const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const usersRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express(); // подключаем express

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', (err) => {
  if (err) throw err;

  console.log('Successfully connected');
});

app.use(bodyParser.json());
app.use(cookieParser());
// аутентификация пользователя
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
// создание пользователя
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
// авторизация
app.use(auth);
app.use('/', usersRoute);
app.use('/', movieRoute);

app.use(errors()); // ошибки от celebrate

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
