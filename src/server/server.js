
const { Worker } = require('worker_threads')
const express = require('express');
const bp = require('body-parser');
const request = require("request");
const querystring = require('querystring');
const url=require("url");
const app = express();

app.use(bp.urlencoded({ extended: false }));
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('X-Powered-By', 'nodejs');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
const work2=new Worker('./database.js')
app.get('', function (req, res) {
    const timestamp = (new Date()).valueOf();
    console.log("The timestamp at the time of receiving")
    console.log(timestamp);
    const start = process.hrtime();
    let arg = url.parse(req.url).query;
    let params = querystring.parse(arg);
    // SignUp a user
    if(params.function==='SignUp'){
        let user={
            state:'SignUp',
            name:params.username
        }
        let promise = new Promise((resolve, reject) => {
            work2.postMessage(user)
            work2.on('message', value => {
                resolve(value)
            })
        })
        promise.then(value => {
                res.json({
                    "state": value.state,
                    "message":value.message
                })
                res.end()
                return;
        })
    }// User SignIn
    else if (params.function==='SignIn'){
        let user={
            state:'SignIn',
            name:params.username
        }
        let promise = new Promise((resolve, reject) => {
            work2.postMessage(user)
            work2.on('message', value => {
                resolve(value)
            })
        })
        promise.then(value => {
            res.json({
                "state": value.state,
                "message":value.message,
                "data":value.data
            })
            res.end()
            return;
        })
    }//Add or modify an API key for a user
    else if(params.function==='API'){
        let user={
            state:'API',
            service:params.service,
            name:params.name,
            API:params.API
        }
        work2.postMessage(user)
        res.end()
    } //Obtain data from a third-party server
    else {
        let url2,url3;
        if(params.function==='weather') {
             url2 = 'https://api.openweathermap.org/data/2.5/forecast?'
             url3 = url2 + 'q=' + params.q + '&appid=' + params.API;
        }else if(params.function==='translate'){
             url2='http://api.fanyi.baidu.com/api/trans/vip/translate?';
             url3=url2+'q='+params.q+'&from='+params.from+'&to='+params.to+'&appid='+params.appid+'&salt='+params.salt+'&sign='+params.sign;
        }
        // console.log(url3)
            let options = {
                url: url3,
                method: 'POST',
            }
            request(options, function (error, response, body) {
                        if (error !== null) {
                            console.log(error);
                            return;
                        }
                        // console.log('Data acquisition success')
                        res.json(JSON.parse(response.body));
                        res.end();
                        const end = process.hrtime(start);
                        console.log(end);
            })
    }

})

//3000    connection.end();
let host='localhost';
app.listen(3000,host, () => {
    console.log(`The server is started successfully. Wait for the client request`)
})

