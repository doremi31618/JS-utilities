var EventEmitter = require('promise-events');
var {SystemMessage} = require('./Message');
module.export = class StateMachine extends EventEmitter{
    constructor(props){
        super();
    }

    init(props){

        this.states = new Map();
        this.transitions = new Map();
        this.initial = "NotSetInitial";
        this.current = {
            type: "state",
            name: this.initial
        }
        if (!props)return new SystemMessage("init", "not found transition", "complete");
        
        //assgin value and check 
        if (props.name)this.name = props.name;
        if (initial) this.initial = props.initial;
        if (props.states && props.states.length > 0) this.states = props.states;
        if (props.transitions && props.transitions.length > 0) this.transitions = props.transitions;


    }

    //state CRUD
    allStates(){
        return this.states;
    }
    addState(state){
        if (!state || !state.name)return new SystemMessage("addState", "no input or without name", "failed");
        if (this.states.has(state.name))return new SystemMessage("addState", "already have this state, duplicate state name", "failed"); 
        this.states.set(state.name, state);
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
        
    }
    availableTransitions(){
        
    }
    allTransitions(){

    }

   

    

    _changeCurrentStatus(nextStatus){
        let {type, status, name} = nextStatus;
        let data = (type == "state") ? this.states.get(name) : this.transitions.get(name);
        this.emit(status+name, data);
    }

    to(transitionName){
        if (!this.transition.has(transitionName)) return new SystemMessage("transition", "not found transition", "failed");
        
        let transition = this.transitions.get(transitionName);
        let prev = this.states.get(transition.from);
        let next = this.states.get(transition.to);
        this.emit("onLeave"+transition.from, prev);
        this.emit("onBefore"+transitionName, transition);
        this.emit("on"+transitionName, transition).then(
            (results)=>{
                this.emit("onAfter"+transitionName, transition);
                this.emit("onEnter"+transition.to, next);
            }
        );
    }
    
    start(){

    }



}
