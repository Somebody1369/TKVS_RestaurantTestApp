const express = require('express');
const router = express.Router();

// Обработчик GET-запроса для отображения страницы оплаты
router.get('/', (req, res) => {
  res.render('payment');
});

// Обработчик POST-запроса для обработки данных оплаты
router.post('/', (req, res) => {
  // Здесь вы можете добавить логику для проверки данных карты и выполнения оплаты.
  // Например, вы можете проверить, соответствуют ли введенные данные тестовому шаблону
  // и вернуть соответствующий результат.
  const cardData = req.body;
  const isPaymentSuccessful = checkPayment(cardData);

  if (isPaymentSuccessful) {
    res.send('Payment successful');
  } else {
    res.send('Payment failed');
  }
});

// Функция для проверки данных карты
function checkPayment(cardData) {
  // Ваша логика проверки данных карты здесь
  // Верните true, если платеж успешен, или false в противном случае
  // Пример:
  const cardNumber = cardData.cardNumber;
  const cvv = cardData.cvv;

  // Проверяем, соответствуют ли данные карты тестовому шаблону
  if (cardNumber === '1234567890123456' && cvv === '123') {
    return true;
  }

  return false;
}

module.exports = router;
