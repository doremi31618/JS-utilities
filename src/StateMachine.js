var EventEmitter = require('promise-events');
var {SystemMessage} = require('./Message');
module.exports = class StateMachine extends EventEmitter{
    constructor(props){
        super();
        this.init(props);
    }

    init(props){

        this.states = new Map();
        this.transitions = new Map();
        this.eventProtypes = new Map();
        this.initial = "NotSetInitial";
        this.current = {
            type: "state",
            name: this.initial
        }
        this.observerEvents = [];
        
        if (!props)return new SystemMessage("init", "not found transition", "complete");
        
        //assgin value and check 
        if (props.states && props.states.length > 0){
            for(var i in props.states){
                this.addState(props.states[i]);
            }
        }
        if (props.transitions && props.transitions.length > 0) {
            for(var i in props.transitions){
                this.addTransition(props.transitions[i]);
            }
        }
        if (props.name) this.name = props.name;
        if (initial) this.initial = props.initial;
    }

    //state CRUD
    allStates(){return this.states;}
    allTransitions(){ return this.transitions;}

    addState(state){
        if (!state || !state.name)return new SystemMessage("addState", "no input or without name", "failed");
        if (this.states.has(state.name))return new SystemMessage("addState", "already have this state, duplicate state name", "failed"); 
        if (this.initial == "NotSetInitial" && this.states.size == 0)this.initial = state.name;
        this.states.set(state.name, state);
        this.on("onEnter"+state.name, ()=>{
            this.current = {
                type: "state",
                name: state.name
            }
        });

    }
    updateState(state){
        if (!state || !state.name)return new SystemMessage("addState", "no input or without name", "failed");
        if (this.states.has(state.name))return new SystemMessage("addState", "already have this state, duplicate state name", "failed"); 
        this.states.get(state.name) = state;
    }
    removeState(stateName){
        if (!this.states.has(stateName))return new SystemMessage("removeState", "there is no stateName in the list ", "failed"); 
        this.states.delete(stateName);
    }

    //transition CRUD
    addTransition(transition){
        if (!transition || !transition.name)return new SystemMessage("addState", "no input or without name", "failed");
        if (this.transitions.has(transition.name))return new SystemMessage("addState", "already have this state, duplicate state name", "failed"); 
        this.transitions.set(transition.name, transition);
        this.on("onBefore"+this.transitions, ()=>{
            this.current = {
                type: "transitions",
                name: transition.name
            }
        })
        
        
    }
    availableTransitions(){
        if (!this.transitions || this.transitions.length==0)return [];
        var arr = [];
        this.transitions.forEach((value,key)=>{
            if (value.from == this.current.name)
                arr.push(value);
        })
        return arr;
    }

    getTransition(from, to){
        for(const item of this.transitions){
            if (item[1].from == from && item[1].to == to)
                return item[1];
        }
    }

    to(stateName){
        /**
         * to do
         * 1. check if this is available transition
         * 2. add a asynchronize transition => use event queue to implement
         */
        if (!this.states.has(stateName)) return new SystemMessage("transition", "not found transition", "failed");
        let transition = this.getTransition(this.current.name, stateName);
       
        if (!transition) return new SystemMessage("transition", "not available transition", "failed");
        if (this.current.name != transition.from) return new SystemMessage("transition", "not available transition", "failed");
        let prev = this.states.get(transition.from);
        let next = this.states.get(transition.to);

        this.observe("onLeave"+transition.from, prev);
        this.observe("onBefore"+transition.name, transition);
        this.observe("on"+transition.name, transition);
        this.observe("onAfter"+transition.name, transition);
        this.observe("onEnter"+transition.to, next);
    }

    isPromise(p) {
        return p && Object.prototype.toString.call(p) === "[object Promise]"
    }

    event(event_name, callback){
        if (this.eventProtypes.has(event_name)){
            this.eventProtypes.get(event_name) = callback;
            return;
        }
        this.eventProtypes.set(event_name, callback);

    }
    start(){
        //check if there is available state
        if (this.initial == "NotSetInitial")return new SystemMessage("start", "no available state to start", "failed");
        this.current = {
            type: "state",
            name: this.initial
        }
        this.observe("onEnter"+this.initial, this.states.get(this.initial))
    }

    observe(_eventName, data){

        let lastIndex = this.observerEvents.length;
        const eventTemplate = {
            name : _eventName,
            status: "pending"
        }

        const triggerEvent = ()=>{

            this.emit(_eventName, data);
            eventTemplate.status = 'processing';
        }

        eventTemplate.event = triggerEvent;
        this.observerEvents.push(eventTemplate);
        
        this.on(_eventName, async ()=>{
            //process substitude event
            if (this.eventProtypes.has(_eventName)){
                let _event = this.eventProtypes.get(_eventName);
                if (this.isPromise(_event))
                    await this.eventProtypes.get(_eventName);
                else 
                    _event();
            }
            eventTemplate.status = "complete";
            this.observerEvents.shift();

            if (this.observerEvents.length == 0 ) return;
            if (this.observerEvents[0].status == "pending"){
                this.observerEvents[0].event();
            }
        })
        if (lastIndex==0)
            triggerEvent();
        
        
    }
}
