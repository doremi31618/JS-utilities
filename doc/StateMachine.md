# StateMachine

> table of contents
> 

### Why Use

1. support asynchronous
2. MVC structure
3. light weight
4. based on event emitter
5. easy to use

## Example

### create StateMachine

> use case 1 : create by manual
> 

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

![截圖 2022-05-24 下午1.45.01.png](StateMachine%2018739d90c2f84707b44a9bf3263738b2/%E6%88%AA%E5%9C%96_2022-05-24_%E4%B8%8B%E5%8D%881.45.01.png)

> use case 2 : create by config
> 

```jsx
let fsm = new StateMachine({
	name: "StateMachineName",
	initial: "state1",
	states:[{
		name:"state1"
	},{
		name:"state2"
	],
	transitions:[{
		from: "state1",
		to: "state2",
		name: "state1ToState2",
		mode: "event"
	}]
});
fsm.start();
```

## config

### StateMachine

---

```json
{
	name: "StateMachineName",
	initial: "state1",
	states:[{
		name:"state1"
	},{
		name:"state2"
	],
	transitions:[{
		from: "state1",
		to: "state2",
		name: "state1ToState2"
	}]
}
```

- `name`
- `initial`
- `states`
- `transitions`

### State

---

```json
{
	name: "State1",
	id: "unique_id",
	type: "standard",
	extra:{}
}
```

- `name` - (necessary attribute)
- `id` - (option)
- `type`  - (option)
- `extra` - (option)

### Transition

---

```json
{
	name: "State1",
	from: "unique_id",
	to: "standard",
}
```

- `name`
- `from`
- `to`

## Lifecycle

![截圖 2022-05-19 下午4.54.13.png](StateMachine%2018739d90c2f84707b44a9bf3263738b2/%E6%88%AA%E5%9C%96_2022-05-19_%E4%B8%8B%E5%8D%884.54.13.png)

## API

### addState

---

`attribute` - meaning of attribute

```jsx
//example
fsm.addState({name: "State1"});
fsm.addState({name: "State2"});
```

### addTransition

---

`from` - where to start

`to` - where is the end state

`name` - transition name

```jsx
//example
fsm.addTransition({
    from: "State1",
    to: "State2",
    name: "State1ToState2"
})
```

### availableTransitions

---

return all the transition that from’s value equal to current.name

```jsx
//example
console.log(fsm.availableTransitions());
/*{
 *. from: "State1",
 *. to: "State2",
 *. name: "State1ToState2"
*/
```

### to

---

transition to next state

`state_name` - the destination state. 

```jsx
//example
let fsm = new StateMachine();
fsm.addState({name: "State1"});
fsm.addState({name: "State2"});
fsm.addTransition({
    from: "State1",
    to: "State2",
    name: "State1ToState2"
})
fsm.start();
fsm.to("State2");
```

### start

---

direct current state to init state

TODO : 

1. need to add state first

```jsx
//example
fsm.start();
console.log(fsm.current());
//direct to fsm.initial
```

### event

---

`event_name` - the event that you want to substude

`callback` - the event you want to process

```jsx
/* promise */
fsm.event('onLeaveState1', new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('after 1 sec');
        resolve("success");
    },1000);
}))

/* event */
fsm.event('onBeforeState1ToState2', 
	()=>{
		console.log('before transition');
})
```

## Listening Events

> ex State1 ⇒ Transition1 ⇒ State2
> 

`onEnterState1` - (”onEnter” + State1)

`onLeaveState1` - (”onLeave” + State1)

`onBeforeTransition1` - (”onBefore” + Transition1)

`onTransition1` - (”on” + Transition1)

`onAfterTransition1` - (”onAfter” + Transition1)

## Reference

[javascript-state-machine/lifecycle-events.md at master · jakesgordon/javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine/blob/master/docs/lifecycle-events.md)

[XState Docs](https://xstate.js.org/docs/)

[promise-events](https://www.npmjs.com/package/promise-events)