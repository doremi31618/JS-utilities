/**Document :  https://www.notion.so/Timeline-e2c76647b2b24844a337c3e09340665f*/

var events = require('events');
var EventEmitter = events.EventEmitter;

module.exports =  class Timeline extends EventEmitter{
    constructor(config){
        super();
        this.init();
        if (!config)return;
        this.load(config);
    }
    init(){
        this.interval = 100;//0.1sec
        this._time = 0;
        this._timer = null;
        this._events = [];
        this._currentEvent = 0;
        this.isArrange = false;
        console.log(this);
    }
    load(config){
        if (config.name) this.name = config.name;
        if (config.duration) this.duration = config.duration;
        if (config.interval) this.interval = config.interval;
        this.events = config.events;
        this.arrange("startTime");
    }
    arrange(sortBy){
        this.isArrange = true;
        this.events.sort((a, b)=>{return a[sortBy] - b[sortBy]});
    } 

    //add a TimeEvent
    addEvent(timeEvent){
        let {name, type, mode, id, startTime} = timeEvent;
        if (this._time > 0) return;
        const tarElem = this.find(this.events.find(elem => elem.id <= startTime));
        this.events.splice(tarElem, 0, timeEvent);
    }

    removeEvent(id){
        if (this._time > 0) return;
        const tarElem = this.events.find(elem => elem.id == id);
        if (!tarElem)return;
        this.events.splice(tarElem, 1);
    }


    play(){
        this._timer = setInterval(()=>{
            //handle trigger event
            console.log(this.events.length, this._currentEvent)
            if (this.events.length-1 >= this._currentEvent) {
                this.stop();
                return;
            }
            
            while(this.events[this._currentEvent].startTime <= this._time){
                let eventArgs = this.events[this._currentEvent];
                let name = eventArgs.name;
                this.emit(name , eventArgs);
                this._currentEvent +=1;
            }

            //handle time adding
            this._time += this.interval;
            if (this._time > this._duration)
                this.stop();
        },this.interval);
    }
    pause(){
        clearInterval(this._timer);
    }
    stop(){
        this.time = 0;
        clearInterval(this._timer);
    }
    restart(){
        this.time = 0;
        clearInterval(this._timer);
        this.play();
    }
}