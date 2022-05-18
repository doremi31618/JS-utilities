
const config = {
    name: "AudioFenceGame",
    duration: 20000,
    interval: 100,
    events: [
        {
            name: "start_game",
            type: "event",
            mode: "none",
            id: "start_game",
            startTime: 0,
            extra: {}
        },
        {
            name: "start_game",
            type: "event",
            mode: "none",
            id: "start_game",
            startTime: 3000,
            extra: {}
        },
        {
            name: "start_game",
            type: "event",
            mode: "none",
            id: "start_game",
            startTime: 5000,
            extra: {}
        },
        {
            name: "start_game",
            type: "event",
            mode: "none",
            id: "start_game",
            startTime: 7000,
            extra: {}
        },
        {
            name: "start_game",
            type: "event",
            mode: "none",
            id: "start_game",
            startTime: 9000,
            extra: {}
        },
        {
            name: "start_game",
            type: "event",
            mode: "none",
            id: "start_game",
            startTime: 12000,
            extra: {}
        },
        {
            name: "start_game",
            type: "event",
            mode: "none",
            id: "start_game",
            startTime: 15000,
            extra: {}
        },
    ]
}
var Timeline = require('./Timeline');
let timeline = new Timeline();
timeline.load(config);
timeline.on("start_game", (eventArgs)=>{
    console.log(eventArgs);
})
timeline.play();