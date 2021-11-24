const fs = require("fs");
const findRemoveSync = require("find-remove");

const amountFiles = 113;
const collectionSize = 15;
const selected = 3;
const resultExpiration = 30;

const getCaptcha = () => {

    // generating a set of pictures
    const numbers = [];
    while(numbers.length < collectionSize){
        const number = Math.floor(Math.random() * amountFiles) + 1;
        if(numbers.indexOf(number) === -1) numbers.push(number);
    }

    // generating a selected images
    const select = [];
    while(select.length < selected){
        let number = Math.floor(Math.random() * (collectionSize - 1)) + 1;
        number = numbers[number];
        if(select.indexOf(number) === -1) select.push(number);
    }

    // reading selected images into base64
    const pictures = [];
    select.forEach(number => {
        pictures.push(fs.readFileSync(`${__dirname}/collection/${number}.png`, {encoding: 'base64'}));
    })

    // writing the result
    const timeStamp = Math.floor(Date.now() / 1000);
    fs.writeFileSync(`${__dirname}/results/${timeStamp}.chk`, `${select.join(' ')}`);

    // removing old results
    findRemoveSync(`${__dirname}/results`, {age: { seconds: resultExpiration }, extensions: '.chk'});

    return {numbers, pictures, timeStamp};
}

const checkCaptcha = (timeStamp, choice) => {
    // removing old results
    findRemoveSync(`${__dirname}/results`, {age: { seconds: resultExpiration }, extensions: '.chk'});

    if (!choice || !timeStamp) return {status: 'failed', message: 'The "choice" and "timeStamp" parameters is required.'}
    if (!fs.existsSync(`${__dirname}/results/${timeStamp}.chk`)) return {status: 'failed', message: 'Captcha is out of date.'}
    if (fs.readFileSync(`${__dirname}/results/${timeStamp}.chk`).toString() !== choice) return {status: 'failed', message: 'The sequence of pictures does not match the sample.'}
    return {status: 'ok', message: 'Successful response.'};
}

module.exports = { getCaptcha, checkCaptcha }