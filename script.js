const videoCont = document.querySelector(".video-cont");  // the video container
const videoInput = document.querySelector("#videoInput");  // the html video tag itself
const videoControlCont = document.querySelector(".video-controls"); // the video controls container
const progressCont = document.querySelector(".progressCont");  // the progress bar container
const progress = document.querySelector(".progress");  // the progress with color pink
const timeProgress = document.querySelector(".timeProgress");  // the time progress on top of the progress
const volRange = document.querySelector("#range");  // the range input next to the vol icon
const volIcon = document.querySelector(".range i");   // the volume icon itself
const currentTIme = document.querySelector(".currentTIme");  // the current time in the video
const totalTime = document.querySelector(".totalTime");   // the total of the video
const skipBackwardBtn = document.querySelector(".skipBackward");  // btn to skip by 5s backward
const playPauseBtn = document.querySelector(".play_pause i");   // btn that switch btw play and pause 
const skipForwardBtn = document.querySelector(".skipForward");  // btn to skip by 5s forward
const playSpeedBtn = document.querySelector(".playbackSpeed");   // btn to click in other to get speed options
const playSpeedOptions = document.querySelector(".options");  // the options container
const speed = document.querySelectorAll(".speed");  // the options for the playback speed
const playInPic = document.querySelector(".playInPic");  // play in picture btn
const fullScreen = document.querySelector(".fullScreen");  // the fullscreen btn
let timer;





window.addEventListener("load", () => {
    videoInput.volume = volRange.value / 100;

    if(videoInput.volume == 0){
        volIcon.classList.remove("fa-volume-up");
        volIcon.classList.remove("fa-volume-down");
        volIcon.classList.add("fa-volume-off");
    }else if(videoInput.volume > 0 && videoInput.volume <= 0.3){
        volIcon.classList.remove("fa-volume-up");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.add("fa-volume-down");
    }else{
        volIcon.classList.add("fa-volume-up");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.remove("fa-volume-down");
    }
})



function timeUpdate(e) {
    const {duration, currentTime} = e.srcElement;
    let currentPercentage = (currentTime / duration) * 100;
    progress.style.width = `${currentPercentage}%`;

    const secs = currentTime;
    currentTIme.textContent = formatSecs(secs);
    timeProgress.textContent = formatSecs(secs);
}

function loadData(e) {
    const duration = e.target.duration;
    e.target.currentTime = 0;
    totalTime.innerText = formatSecs(duration)
}

function formatSecs(data){
    let hours = Math.floor(data / 3600);
    let mins = Math.floor(data / 60) % 60;
    let secs = Math.floor(data % 60);

    if(hours < 10){
        hours = `0${hours}`
    }
    if(mins < 10){
        mins = `0${mins}`
    }
    if(secs < 10){
        secs = `0${secs}`
    }
    
    return `${hours}:${mins}:${secs}`;
}

function setTime(e){
    const width = this.clientWidth;
    const offset = e.offsetX;
    const duration = videoInput.duration;
    const newTime = (offset / width) * duration;

    videoInput.currentTime = newTime;
}

function playVideo(){
    videoInput.play()
}

function pauseVideo() {
    videoInput.pause()
}

function skipBackward() {
    videoInput.currentTime -= 5;
}

function skipForward() {
    videoInput.currentTime += 5;
}

function playSpeed() {
    if(playSpeedOptions.classList.contains("show")){
        playSpeedOptions.classList.remove("show");
    }else{
        playSpeedOptions.classList.add("show");
    }
}

function setSpeed(e){
    speed.forEach( btn => {
        btn.classList.remove("active")
    });
    const playSpeed = parseFloat(e.target.dataset.num);
    playSpeedOptions.classList.remove("show");
    e.target.classList.add("active")
    videoInput.playbackRate = playSpeed;
}

function muteIt(e){
    if(e.target.classList.contains("fa-volume-up")){
        e.target.classList.remove("fa-volume-up");
        e.target.classList.add("fa-volume-off");
        videoInput.volume = 0;
        volRange.value = 0;
    }else{
        e.target.classList.add("fa-volume-up");
        e.target.classList.remove("fa-volume-off");
        videoInput.volume = 1;
        volRange.value = 100;
    }
}

function setVol(e){
    const calVol = (e.target.value / 100);
    videoInput.volume = calVol;


    if(calVol == 0){
        volIcon.classList.remove("fa-volume-up");
        volIcon.classList.remove("fa-volume-down");
        volIcon.classList.add("fa-volume-off");
    }else if(calVol > 0 && calVol <= 0.3){
        volIcon.classList.remove("fa-volume-up");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.add("fa-volume-down");
    }else{
        volIcon.classList.add("fa-volume-up");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.remove("fa-volume-down");
    }
}

function requestPlayinPic() {
    videoInput.requestPictureInPicture()
}


function draggableProgress(e){
    let width = e.target.clientWidth;
    let offset = e.offsetX;
    progress.style.width = `${offset}px`;
    videoInput.currentTime = (offset / width) * videoInput.duration;
    const progression = (offset / width) * videoInput.duration;
}

function enableFullScreen(){
    if(videoCont.classList.contains("fullscreen")){
        videoCont.classList.remove("fullscreen");
        videoInput.exitFullScreen();
    }else{
        videoCont.classList.add("fullscreen");
        videoInput.requestFullscreen();
    }
}

const hidecontrols = () => {
    if(videoInput.paused) return;
    timer = setTimeout(() => {
        videoControlCont.classList.remove("show-controls")
    }, 5000);
}

hidecontrols();

videoCont.addEventListener("mousemove", () => {
    videoControlCont.classList.add("show-controls");
    clearTimeout(timer);
    hidecontrols();
})

videoControlCont.addEventListener("mouseover", () => {
    videoControlCont.classList.add("show-controls");
})

videoControlCont.addEventListener("mouseout", () => {
    videoControlCont.classList.remove("show-controls");
})

function stopMedia(){
    if(playPauseBtn.classList.contains("fa-pause")){
        playPauseBtn.classList.remove("fa-pause");
        playPauseBtn.classList.add("fa-play");
    }
    videoInput.currentTime = 0;
}






// event listeners
videoInput.addEventListener("timeupdate", timeUpdate);
videoInput.addEventListener("loadeddata", loadData);
videoInput.addEventListener("ended", stopMedia);
progressCont.addEventListener("click", setTime);
playPauseBtn.addEventListener("click", (e) => {
    if(e.target.classList.contains("fa-play")){
        playVideo();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
    }else{
        pauseVideo();
        e.target.classList.remove("fa-pause");
        e.target.classList.add("fa-play");
    }
})
skipBackwardBtn.addEventListener("click", skipBackward);
skipForwardBtn.addEventListener("click", skipForward);
playSpeedBtn.addEventListener("click", playSpeed);
speed.forEach( btn => {
    btn.addEventListener("click", setSpeed);
});
volIcon.addEventListener("click", muteIt);
volRange.addEventListener("change", setVol);
progressCont.addEventListener("mousedown", () => {
    progressCont.addEventListener("mousemove", draggableProgress);
});
videoCont.addEventListener("mouseup", () => {
    progressCont.removeEventListener("mousemove", draggableProgress);
})
playInPic.addEventListener("click", requestPlayinPic);
fullScreen.addEventListener("click", enableFullScreen);


// loadVideo Logic
const fileLoader = document.querySelector("#loadVideo");
fileLoader.addEventListener("change", () => {
    stopMedia();
    videoInput.currentTime = 0;
    const data = fileLoader.files[0];
    var objectUrl = URL.createObjectURL(data);
    videoInput.src = `${objectUrl}`;
})