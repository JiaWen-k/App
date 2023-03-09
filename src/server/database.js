const { parentPort } = require('worker_threads')
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    port: '3306',
    database : 'test'
});

function add(API) {
    connection = mysql.createConnection(connection.config);
    connection.connect();
    let addSql = 'INSERT INTO test(Id) VALUES(?)';
    let addSqlParams = [API];
//add
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR]', err.message);
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });
    connection.end();
}
//Search the API in the database
function query(API) {
        connection = mysql.createConnection(connection.config);
        let sql = 'SELECT * FROM test WHERE ID= ?';
        let addSqlParams = [API];
        connection.query(sql,addSqlParams, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]', err.message);
                parentPort.postMessage('false')
                connection.end();
                return;
            }
            if(result.length===0){
                console.log("This API is not included in the database")
                parentPort.postMessage('false')
                connection.end();
                return;
            }
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
            connection.end();
            parentPort.postMessage('true')
});
}
parentPort.onmessage = (event) => {
query(event.data)
}
