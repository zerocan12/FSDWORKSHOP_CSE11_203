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
function handleClick(event){
    console.log("button clicked");

}
button.addEventListener('click' , handleClick);
button.dispatchEvent({
    eventType : "click"
})
const button1 = createDomElements();
button1.addEventListener('submit' , ()=>{
    console.log("submitted");
});
button1.dispatchEvent({
    eventType : "submit"

});
function handleSubmit(event){
    console.log("form submitted");
}
button1.addEventListener('submit' , handleSubmit);