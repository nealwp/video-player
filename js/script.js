const videoPlayer = document.querySelector('.video-player')
const video = videoPlayer.querySelector('.video')
const playButton = videoPlayer.querySelector('.play-button')
const volumeButton = videoPlayer.querySelector('.volume-button')
const playPauseIcon = document.getElementById('play-pause-icon')
const volume = videoPlayer.querySelector('.volume')
const currentTimeElement = videoPlayer.querySelector('.current')
const durationTimeElement = videoPlayer.querySelector('.duration')
const progress = videoPlayer.querySelector('.video-progress')
const progressBar = videoPlayer.querySelector('.video-progress-filled')
const slider = document.getElementById('volume-slider')
const min = slider.min
const max = slider.max
const value = slider.value
const neonPurple = "rgb(194, 40, 194)"


video.addEventListener('loadeddata', (e) => {
    
    if(video.readyState >= 3) {
        let durationMinutes = Math.floor(video.duration / 60 )
        let durationSeconds = Math.floor(video.duration - durationMinutes * 60)

        durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds < 10 ? '0'+durationSeconds : durationSeconds}`
    }
})

volumeButton.addEventListener('mouseenter', (e) => {
    slider.style.width = "10%"
    slider.style.visibility = "visible"

    setTimeout(() => {
        slider.style.width = "0%"
        slider.style.visibility = "hidden"
    }, 2000)
})

//Play and Pause button

playButton.addEventListener('click', (e) => {
    if (video.paused) {
        video.play()
        playPauseIcon.classList.add('fa-pause')
        playPauseIcon.classList.remove('fa-play')
    } else {
        video.pause()
        playPauseIcon.classList.add('fa-play')
        playPauseIcon.classList.remove('fa-pause')
    }  
})

// volume

volume.addEventListener('mousemove', (e) => {
    video.volume = e.target.value
})

slider.style.background = `linear-gradient(to right, ${neonPurple} 0%, ${neonPurple} ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`

slider.oninput = function() {
    this.style.background = `linear-gradient(to right, ${neonPurple} 0%, ${neonPurple} ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`
  };

//current time and duration



const currentTime = () => {
    let currentMinutes = Math.floor(video.currentTime / 60)
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60)
    let durationMinutes = Math.floor(video.duration / 60 )
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60)

    currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds < 10 ? '0'+durationSeconds : durationSeconds}`
}


video.addEventListener('timeupdate', currentTime)


//progress bar

video.addEventListener('timeupdate', () => {
    const percentage = (video.currentTime / video.duration) * 100
    progressBar.style.width = `${percentage}%`
})

// change progress bar pos

progress.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = progressTime
})