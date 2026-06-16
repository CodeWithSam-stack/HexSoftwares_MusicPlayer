const songs = [
{
    title: "Lin Jianxian",
    artist: "Bai Lu",
    src: "songs/song1.mp3"
},
{
    title: "Farewell Love",
    artist: "Faye",
    src: "songs/song2.mp3"
},
{
    title: "Halo",
    artist: "Son Yerim",
    src: "songs/song3.mp3"
},
{
    title: "Can you Hear my Heart",
    artist: "Lee Hi",
    src: "songs/song4.mp3"
},
{
    title: "Away",
    artist: "Ian Post",
    src: "songs/song5.mp3"
},
{
    title: "Whispers",
    artist: "Okaya",
    src: "songs/song6.mp3"
},
{
    title: "Have a Wonderful Day",
    artist: "The High Jynks",
    src: "songs/song7.mp3"
},
{
    title: "Lights",
    artist: "The Places",
    src: "songs/song8.mp3"
},
{
    title: "My Secret Place",
    artist: "Yair Cohen",
    src: "songs/song9.mp3"
},
{
    title: "Can't be bothered",
    artist: "Ty Simon",
    src: "songs/song10.mp3"
}
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let songIndex = 0;

function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    document.querySelectorAll("#playlist li").forEach(item => {
        item.classList.remove("active");
    });

    document.getElementById(`song-${index}`).classList.add("active");
}

function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener("click", () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
});

audio.addEventListener("timeupdate", () => {

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent || 0;

    currentTimeEl.textContent =
        formatTime(audio.currentTime);

    durationEl.textContent =
        formatTime(audio.duration);
});

progress.addEventListener("input", () => {

    audio.currentTime =
        (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
    nextBtn.click();
});

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.id = `song-${index}`;

    li.innerHTML = `
        <strong>${song.title}</strong><br>
        ${song.artist}
    `;

    li.addEventListener("click", () => {
        songIndex = index;
        loadSong(songIndex);
        playSong();
    });

    playlist.appendChild(li);
});

audio.volume = 1;

loadSong(songIndex);