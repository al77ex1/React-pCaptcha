const fs = require("fs");
const findRemoveSync = require("find-remove");

const getCaptcha = () => {

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
        pictures.push(fs.readFileSync(`${__dirname}/collection/${number}.png`, {encoding: 'base64'}));
    })

    // writing the result
    const timeStamp = Math.floor(Date.now() / 1000);
    fs.writeFileSync(`${__dirname}/results/${timeStamp}.chk`, `${select.join(' ')}`);

    // removing old results
    findRemoveSync(`${__dirname}/results`, {age: { seconds: 300 }, extensions: '.chk'});

    return {numbers, pictures, timeStamp};
}

const checkCaptcha = (timeStamp, choice) => {
    // removing old results
    findRemoveSync(`${__dirname}/results`, {age: { seconds: 300 }, extensions: '.chk'});

    if (!choice || !timeStamp) return {status: 'failed', message: 'The "choice" and "timeStamp" parameters is required.'}
    if (!fs.existsSync(`${__dirname}/results/${timeStamp}.chk`)) return {status: 'failed', message: 'Captcha is out of date.'}
    if (fs.readFileSync(`${__dirname}/results/${timeStamp}.chk`).toString() !== choice) return {status: 'failed', message: 'The sequence of pictures does not match the sample.'}
    return {status: 'ok', message: 'Successful response.'};
}

module.exports = { getCaptcha, checkCaptcha }