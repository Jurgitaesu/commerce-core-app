const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(express.json());
app.use(cors());

app.get('/api/products', (req, res) => {
  const allProducts = [
    { id: 1, quantity: 1, name: 'CoreProduct', price: '$19.99' },
    { id: 2, quantity: 2, name: 'CoreProduct', price: '$29.99' },
    { id: 3, quantity: 3, name: 'CoreProduct', price: '$39.99' },
  ];
  res.send({ allProducts });
});

app.post('/api/import', (req, res) => {
  const { user, totalProduct } = req.body;
  if (
    user.firstName &&
    user.lastName &&
    user.email &&
    user.address &&
    user.city &&
    user.country &&
    user.region &&
    user.postalCode &&
    user.cardNumber &&
    user.cardExpiry &&
    user.cvv
  ) {
    if (user.cardNumber.match(/\D/)) {
      return res.send({ error: true, message: 'Credit card must contain only numbers' });
    }
    if (user.cardNumber.length !== 16) {
      return res.send({ error: true, message: 'Credit card must be 16 symbols' });
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(user.cardExpiry)) {
      return res.send({ error: true, message: "Credit card's expiry date format must be MM/YY" });
    }
    let b = user.cardExpiry.split('/');
    if (b[0] < 1 || b[0] > 12) {
      return res.send({ error: true, message: "Credit card's expiry month must be from 00 to 12" });
    }
    let today = new Date();
    let c = (today.getFullYear() / 100) | (0 + '');
    if (new Date(c + b[1], b[0], 1) < today) {
      return res.send({ error: true, message: "Credit card's expiry date must be this month or later" });
    }
    if (user.cvv != 100) {
      return res.send({ error: true, message: "Credit card's CVV number is incorrect" });
    }
    return res.send({ error: false, message: 'Payment processed successfully' });
  } else {
    return res.send({ error: true, message: 'Not all required fields are filled' });
  }
});
