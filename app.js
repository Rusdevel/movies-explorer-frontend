const express = require('express');
const mongoose = require('mongoose');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express(); // подключаем express

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', (err) => {
  if (err) throw err;

  console.log('Successfully connected');
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
