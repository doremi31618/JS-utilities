var StateMachine = require("./StateMachine");
let fsm = new StateMachine();
fsm.addState({name: "State1"});
fsm.addState({name: "State2"});
fsm.addTransition({
    from: "State1",
    to: "State2",
    name: "State1ToState2"
})

fsm.on("onEnterState1", (state1)=>{console.log("enter state1 ", state1);})
fsm.on("onEnterState2", (state2)=>{console.log("enter state2 ", state2);})
fsm.on("onBeforeState1ToState2", ()=>{console.log("before enter transition")});
fsm.on('onState1ToState2', ()=>{console.log("state1 to state2")});
fsm.on('onAfterState1ToState2', ()=>{console.log("on leave transition")});
fsm.start();
fsm.to("State2");