class Event{
    constructor(props){
        this.id = props.id;
        this.type = props.type;
        this.mode = props.mode;
        this.name = props.name;
        this.extra = props.extra;
    }
}

class TimeEvent extends Event{
    constructor(props){
        super(props);
        this.startTime = props.startTime;
    }
}


module.exports = {
    Event,
    TimeEvent
}

// export {Event,
//     TimeEvent
// }