const { parentPort } = require('worker_threads')
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
const client=new MongoClient(url)
//User SignIn
async function SignIn(username){
    await client.connect();
    const db = client.db('API')
    const collection=db.collection('User')
    const whereStr = {"name":username};
    const  res = await  collection.find(whereStr).toArray()
    console.log(res)
    if(res.length===0){
        parentPort.postMessage({state:'warning',message:"This user is not included in the database",data:res[0]})
        return;
    }
    parentPort.postMessage({state:'success',message:'you sign In successful',data:res[0]})
}
//Sign up a new User
async function addUser(name){
    await client.connect();
    const db = client.db('API')
    const collection=db.collection('User')
    const whereStr = {"name":name};
    await collection.insertOne(whereStr).catch(function (err){
        if(err.code==11000){
            parentPort.postMessage({state:'warning',message:'duplicate username'})
        }else {
            parentPort.postMessage({state:'warning',message:err})
        }
    })
    // await collection.createIndex({ name : 1 }, { unique:true, sparse:true } )
    // only need to do this once, setting name to a non-empty, unique value
    parentPort.postMessage({state:'success',message:'you sign up successful'})
}
//add or change a API key
async function WeatherAPI(user){
    await client.connect();
    const db = client.db('API')
    const collection=db.collection('User')
    const whereStr = {"name":user.name};
    let updateStr;
    if(user.service==='weather') {
         updateStr = {$set: {'weather': user.API}};
    }else if(user.service==='translate'){
         updateStr = {$set: {"translate": user.API}};
    }
    await collection.updateOne(whereStr,updateStr).catch(err=>console.log(err))
    parentPort.postMessage('true')
}
parentPort.onmessage = (event) => {
    console.log(event.data)
    if(event.data.state==='SignUp'){
        addUser(event.data.name).then().catch().finally(()=>client.close())
    }else if(event.data.state==='SignIn'){
        SignIn(event.data.name).then().catch().finally(() => client.close())
    }
    else {
        WeatherAPI(event.data).then().catch().finally(() => client.close())
    }
}
