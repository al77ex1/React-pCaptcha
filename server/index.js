const express = require('express');

const app = express();

app.get('/get-captcha', (req, res) => {
  res.send('Successful response.');
});

app.get('/check-captcha', (req, res) => {
  res.send('Successful response.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.')); 
