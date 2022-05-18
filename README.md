# Timeline

url : 

[JS-utilities/Timeline.js at master · doremi31618/JS-utilities](https://github.com/doremi31618/JS-utilities/blob/master/Timeline.js)

> table of contents
> 

---

### 使用介紹

Step1 創建/匯入 config

```jsx
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
...
...
```

- 露露等地設定檔
    
    ```jsx
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
    ```
    

Step2 匯入Timeline module

```jsx
var Timeline = require('./Timeline');
```

Step3 創建一條新Timeline

```jsx
let timeline = new Timeline();
```

Step4 將設定檔匯入Timeline

```jsx
timeline.load(config);
```

Step5 定義觸發函式

```jsx
timeline.on("start_game", (eventArgs)=>{
    console.log(eventArgs);
})
```

Step6 播放!

```jsx
timeline.play();
```

完整程式碼

```jsx
var Timeline = require('./Timeline');
let timeline = new Timeline();
timeline.load(config);
timeline.on("start_game", (eventArgs)=>{
    console.log(eventArgs);
})
timeline.play();
```

---

### Timeline 時間軸設定

```jsx
{
	name: "timeline_name",
	duration: 20000,
	interval: 100,
	events:[TimeEvent]
}
```

> 參數介紹
> 
1. name : timeline名稱，方便多條Timeline同時使用
2. duration : 持續時間，以毫秒為單位(i.e. duration: 1000 = 1sec)
3. interval: 計時器最小時間單位，預設是0.1秒(interval : 100)
4. events : 時間事件列表

---

### TimeEvents 時間事件

```jsx
{
	name: "event_name",
	type: "event",
	mode: "none",
	id: "event_id",
	startTime: 0,
	extra: {}
}
```

> 參數介紹
> 

name : 事件名稱，同時也是timeline.emit呼叫的事件

type: 目前只有event可以選，未來會新增animation…e作為一個保留參數

mode: 未來可以加入一些判斷項

id: 用來搜索特定的事件，所以需要保持每個事件有一個獨立id

startTime: 開始時間

extra: 作為特殊參數使用

---