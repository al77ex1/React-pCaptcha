const express = require('express');
const fs = require('fs');
const  findRemoveSync = require('find-remove');

const app = express();


app.get('/get-captcha', (req, res) => {

  // generating a set of pictures
  const numbers = [];
  while(numbers.length < 15){
    const number = Math.floor(Math.random() * 113) + 1;
    if(numbers.indexOf(number) === -1) numbers.push(number);
  }

  // generating a selected images
  const select = [];
  while(select.length < 3){
    let number = Math.floor(Math.random() * 14) + 1;
    number = numbers[number];
    if(select.indexOf(number) === -1) select.push(number);
  }

  // reading selected images into base64
  const pictures = [];
  select.forEach(number => {
    pictures.push(fs.readFileSync(`./collection/${number}.png`, {encoding: 'base64'}));
  })

  // writing the result
  const timeStamp = Math.floor(Date.now() / 1000);
  fs.writeFileSync(`./results/${timeStamp}.chk`, `${select.join(' ')}`);

  // removing old results
  findRemoveSync(__dirname + '/results', {age: { seconds: 300 }, extensions: '.chk'});

  res.send({numbers, pictures, timeStamp});
});


app.get('/check-captcha', (req, res) => {

  // removing old results
  findRemoveSync(__dirname + '/results', {age: { seconds: 300 }, extensions: '.chk'});

  res.send('Successful response.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.')); 
