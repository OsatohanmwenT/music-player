const playBack = document.querySelector(".back")
const playForward = document.querySelector(".forward")
const audioLength = document.querySelector(".progress-bar")
const length = document.querySelector(".length")
const mainControl = document.getElementById("play/pause")
const song = document.getElementById("song")
const currentTime = document.getElementById("current")
const finalTime = document.getElementById("final")
const nameOfSong = document.getElementById("name")
const artist = document.getElementById("artist")

const music = [
    {
        "name": "Lost in the City Lights",
        "artist": "Cosmo Sheldrake",
        "audio": "assets/lost-in-city-lights-145038.mp3",
        "image":"assets/cover-1.png"
    },
    {
        "name": "Forest Lullaby",
        "artist": "Lesfm",
        "audio": "assets/forest-lullaby-110624.mp3",
        "image":"assets/cover-2.png"
    }
]

let currentIndex = 0

const defaultDisplay = (index) =>{
    image.src = music[index].image
    song.src = music[index].audio
    nameOfSong.textContent = music[index].name
    artist.textContent = music[index].artist
}

window.addEventListener("load",() => {
    reset()
    defaultDisplay(currentIndex)
})

let isPlaying = false;

mainControl.addEventListener("click", () => {
    if(!isPlaying){
        mainControl.src = "assets/pause.svg";
        isPlaying = true;
        song.play();
    }else{
        mainControl.src = "assets/Play_fill.svg";
        isPlaying = false;
        song.pause();
    }
    finalTime.textContent = displayTime(song.duration)
})

playForward.addEventListener("click",() => {
    reset()
    currentIndex++
    mainControl.src = "assets/Play_fill.svg"
    if(currentIndex > music.length - 1){
        currentIndex = 0
    }else{
        currentIndex = currentIndex
    }
    defaultDisplay(currentIndex)
})

playBack.addEventListener("click",() => {
    reset()
    currentIndex--
    mainControl.src = "assets/Play_fill.svg"
    if(currentIndex < 0){
        currentIndex = music.length - 1
    }
    defaultDisplay(currentIndex)
})

const displayTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const secChecked = Math.floor(timeInSeconds % 60)
    const seconds = secChecked < 10 ? '0' + secChecked : secChecked
    return `${minutes}:${seconds}`
}

song.addEventListener("ended", () => {
    mainControl.src = "assets/Play_fill.svg"
})

setInterval(() => {currentTimeDisplay()},1000)

const reset = () => {
    currentTime.textContent = "0:00"
    finalTime.textContent = "0:00"
}

const currentTimeDisplay = () => {
    finalTime.innerHTML = displayTime(song.duration)
    currentTime.innerHTML = displayTime(song.currentTime)
    const progress = (song.currentTime/song.duration) * 100 + "%"
    audioLength.style.width = progress
}

length.addEventListener("click", (event) => {
    // Calculate the percentage of the progress bar clicked
    const clickPosition = event.clientX - length.getBoundingClientRect().left;
    const progressBarWidth = length.offsetWidth;
    const percentageClicked = (clickPosition / progressBarWidth) * 100;

    // Calculate the new playback position based on the percentage clicked
    const newPlaybackPosition = (percentageClicked / 100) * song.duration;

    // Set the new playback position of the audio
    song.currentTime = newPlaybackPosition;
});
