
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
const work1=new Worker('./extensionServer.js')
const work2=new Worker('./database.js')
work1.on('message', value => {
    console.log(value)
})
app.get('', function (req, res) {
    let arg = url.parse(req.url).query;
    let params = querystring.parse(arg);
    let API=params.appid

    let url2 = params.url+req.url.substr(req.url.lastIndexOf("?") + 2);
    let options = {
        url: url2,
        method: 'POST',
    }
    let promise= new  Promise((resolve, reject) => {
        work2.postMessage(API)
        work1.postMessage(''),
    // Check the database to see if this API is included before requesting data from a third-party server
        work2.on('message', value => {
            resolve(value)
        })
    })
    promise.then(value => {
        if (value === 'true') {
                request(options, function (error, response, body) {
                    if (error !== null) {
                        console.log(error);
                        return;
                    }
                    console.log('Data acquisition success')
                    res.json(JSON.parse(response.body));
                    res.end();
                });
        } else {
            res.json({
                "cod": "0"
            })
        }
    })

})

//3000    connection.end();
let host='localhost';
app.listen(3000,host, () => {
    console.log(`The server is started successfully. Wait for the client request`)
})

