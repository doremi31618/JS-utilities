# StateMachine

---

```jsx
var StateMachine = require("./StateMachine");
let fsm = new StateMachine();
fsm.addState({name: "State1"});
fsm.addState({name: "State2"});
fsm.addTransition({
    from: "State1",
    to: "State2",
    name: "State1ToState2"
})

fsm.on("onEnterState1", (state1)=>{console.log("Enter state1 ", state1);})
fsm.on("onLeaveState1", (state1)=>{console.log("Leave state1 ", state1);})
fsm.on("onBeforeState1ToState2", (transition)=>{console.log("Before enter transition",transition)});
fsm.on("onState1ToState2", (transition)=>{console.log("on transition",transition)});
fsm.on('onAfterState1ToState2', (transition)=>{console.log("After transition",transition)});
fsm.on("onEnterState2", (state2)=>{console.log("Enter state2 ", state2);})

fsm.start();
fsm.to("State2");
```

# Timeline

---

```jsx
var Timeline = require('./Timeline');
let timeline = new Timeline();
timeline.load(config);
timeline.on("start_game", (eventArgs)=>{
    console.log(eventArgs);
})
timeline.play();
```