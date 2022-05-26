function createVideo(localVideo) {
    //if (!HTMLVideoElement) window.alert("not support video element");
    console.log('create video');
    const video = document.createElement('video');
    localVideo.innerHTML = video;
    localVideo.autoplay = true;
    localVideo.playsinline = true;
    localVideo.muted = true;
    localVideo.loop = true;
    localVideo.controls = true;
}

function createAudio(userId) {

    if (!HTMLAudioElement) window.alert("not support audio element");
    console.log('create audio');
    const mediaContainer = document.querySelector(".local-stream")
    const audio = document.createElement('audio');
    audio.autoplay = true;
    audio.muted = false;
    audio.id = `audio_${userId}`;
    mediaContainer.appendChild(audio);
    return audio;
}

function autoPlay(localVideo){
    let playPromise = localVideo.play();
    if (playPromise !== undefined){
        playPromise.then(_=>{
            console.log('start to play video');
        })
        .catch(err => {
            console.log('err occured', err);
        })
    }
}

function videoErrorListener(video){
    video.addEventListener("error", function(){
        var code = video.error.code;
        var message = "";

        switch (code){
            case 1:
                message = "中斷下載多媒體檔案";
                break;
            case 2:
                message = "網路連線異常";
                break;
            case 3:
                message = "檔案無法播放";
                break;
            case 4:
                message = "影片發生錯誤";
                break;

        }
        console.log("video error", message);
    }, true);
    video.addEventListener("abort", ()=>{console.log("下載中斷")},true);
    //video.addEventListener("emptied", ()=>{console.log("沒有檔案可以播放")},true);
    video.addEventListener("stalled", ()=>{console.log("無法下載")},true);

}

function getMediaContraint(_audio, _video) {
    return {
        audio: _audio,
        video: _video
    }
}

async function getLocalMediaStream(_audio, _video) {
    
    try {
        const constraint = getMediaContraint(_audio, _video);
        const stream = await navigator.mediaDevices.getUserMedia(constraint);
        return stream;
    } catch (err) {
        window.alert("You don't have media input device, so you can only receive data");
        console.log("get media device error", err);
        return;
    }

}

