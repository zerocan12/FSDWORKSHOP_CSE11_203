import eventEmitter from 'events';
const myEmitter = new eventEmitter();               

function createDomElements(){
    const emitter=new eventEmitter() ;
    return{
        addEventListener(eventType , listner){
            emitter.on(eventType , listner);
        },
        removeEventListener(eventType , listner){
            emitter.removeListener(eventType , listner);
        },
        dispatchEvent(event){
            event.target = this;
            event.currentTarget = this;
            emitter.emit(event.eventType , event);
        }    
    }
}
const button = createDomElements();
button.addEventListener('save' , ()=>{
    console.log("saving ...");
});
button.dispatchEvent({
    eventType : "save" ,
    details : "this is save event"
});
