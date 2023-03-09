
const { parentPort } = require('worker_threads')
function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}
let a=1;
(async function () {
    let b = 2
    while (1) {
        a = a + b
        await sleep(3000)
    }
}())
parentPort.onmessage = (event) => {
  parentPort.postMessage(a)
}


