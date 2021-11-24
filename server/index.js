const express = require('express');
const {getCaptcha, checkCaptcha} = require('./service/pCaptcha');

const app = express();

app.get('/get-captcha', (req, res) => {
  res.send(getCaptcha());
});

app.get('/check-captcha', (req, res) => {
  res.send(checkCaptcha());
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));