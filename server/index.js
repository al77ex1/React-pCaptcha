const express = require('express');
const {getCaptcha, checkCaptcha} = require('./service/pCaptcha');

const app = express();

app.get('/get-captcha', (req, res) => {
  res.send(getCaptcha());
});

app.get('/check-captcha', (req, res) => {
  res.send(checkCaptcha(req.query.timeStamp, req.query.choice));
});

app.listen(3010, () => console.log('Api is listening on port 3010.'));