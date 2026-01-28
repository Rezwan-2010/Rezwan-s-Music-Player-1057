const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEL = document.getElementById('current-time'),
    durationEL = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path : 'assets/Lazy Song.mp3',
        displayName: 'The Lazy Song',
        cover: 'assets/Lazy Song.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Grenade.mp3',
        displayName: 'Grenade',
        cover: 'assets/Grenade.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/It Will Rain.mp3',
        displayName: 'It Will Rain',
        cover: 'assets/It Will Rain.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/24k Magic.mp3',
        displayName: '24k Magic',
        cover: 'assets/24k Magic.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Just The Way You Are.mp3',
        displayName: 'Just The Way You Are',
        cover: 'assets/Just The Way You Are.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Locked Out Of Heaven.mp3',
        displayName: 'Locked Out Of Heaven',
        cover: 'assets/Locked Out Of Heaven.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Talking To The Moon.mp3',
        displayName: 'Talking To The Moon',
        cover: 'assets/Talking To The Moon.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/That Is  What I Like.mp3',
        displayName: 'That Is  What I Like',
        cover: 'assets/That Is  What I Like.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Treasure.mp3',
        displayName: 'Treasure',
        cover: 'assets/Treasure.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Uptown Funk.mp3',
        displayName: 'Uptown Funk',
        cover: 'assets/Uptown Funk.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/When I Was Your Man.mp3',
        displayName: 'When I Was Your Man',
        cover: 'assets/When I Was Your Man.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Chunky.mp3',
        displayName: 'Chunky',
        cover: 'assets/Chunky.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Runaway Baby.mp3',
        displayName: 'Runaway Baby',
        cover: 'assets/Runaway Baby.jpg',
        artist: 'Bronu Mars'
    },
    {
        path : 'assets/Versace On The Floor.mp3',
        displayName: 'Versace On The Floor',
        cover: 'assets/Versace On The Floor.jpg',
        artist: 'Bronu Mars'
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic()
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    //Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEL.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEL.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;

}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);