console.log("this is starting point of my code");
process.nextTick(()=>{
    console.log("this is process.nextTick operation");//asynchronus non blocking
})
setImmediate(()=>{
    console.log("this is set immediate operation");
})

setTimeout(() => {
    console.log("this is setTimeout operation")
}, 10000);
console.log("this is end point of my code");//synchronus blocking

setTimeout(() => {
    console.log("this is second timeout" )
}, 5000);
new Promise((resolve,reject)=>{
    let success = true;
    if(success){
        resolve("this is promise resolved");
    } else {
        reject("this is promise rejected");
    }
}).then((result)=>{
    console.log(result);
}).catch((result)=>{
    console.log(result);
});