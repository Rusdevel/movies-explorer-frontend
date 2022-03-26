const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getUser,
} = require('../controllers/users');

// получить данные пользователя
router.get('/users/me', getUser);

// изменение данных пользователя
router.patch('/users/me', celebrate({
  // валидация запроса
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = router;
