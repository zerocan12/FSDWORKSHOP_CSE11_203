import EventEmitter from 'node:events'
const myEmitter = new EventEmitter();
myEmitter.on("greet",(teacher) =>{
    console.log(`class sstarted by ${teacher}`);
});
myEmitter.on("exit",(teacher) =>{
    console.log(`class finished  by ${teacher}`);
});
myEmitter.on("hi",(friend)=>{
    console.log(`'how are you'${friend}`);
});
myEmitter.emit("greet","chandrahas");
myEmitter.emit("exit","chandrahas");
myEmitter.emit("hi","Aniruddha");