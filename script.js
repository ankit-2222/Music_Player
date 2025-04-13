const playBtn = document.querySelector("#play-btn");
const progressBar = document.querySelector("#progress-bar");
const currentSong = document.querySelector(".current-song");
const currentMusicTitle = document.querySelector(".current-music-info h3");
const currentTime = document.querySelector(".current-music-info p");
const previousBtn = document.querySelector("#previous-btn");
const nextBtn = document.querySelector("#next-btn");
const modeChangeBtn = document.querySelector("#mode-logo");
const playlistDiv = document.querySelector(".playlist");

let songIndex = 0;
let isPlaying = false;

let songs = [
  { songName: "Shri Kaal Bhairav Asatakam", filePath: "Resources/Shri Kaal Bhairav Asatakam.mp3", coverPath: "Resources/Shri Kaal Bhairav Asatakam.jpeg" },
  { songName: "Namami Shamishan", filePath: "Resources/Namami Shamishan.mp3", coverPath: "Resources/Namami Shamishan.jpeg" },
  { songName: "Bajrang Baan (Lofi Version)", filePath: "Resources/Bajrang Baan (Lofi Version).mp3", coverPath: "Resources/Bajrang Baan (Lofi Version).jpeg" },
  { songName: "Shri Hanuman Chalisa", filePath: "Resources/Shri Hanuman Chalisa.mp3", coverPath: "Resources/Shri Hanuman Chalisa.jpeg" },
  { songName: "Hua Shankhnaad", filePath: "Resources/Hua Shankhnaad.mp3", coverPath: "Resources/Hua Shankhnaad.jpeg" },
  { songName: "Aarambh Gulaal", filePath: "Resources/Aarambh Gulaal.mp3", coverPath: "Resources/Aarambh Gulaal.jpeg" },
  { songName: "Baagh Ka Kareja", filePath: "Resources/Baagh Ka Kareja.mp3", coverPath: "Resources/Baagh Ka Kareja.jpeg" },
  { songName: "Challa URI", filePath: "Resources/Challa URI.mp3", coverPath: "Resources/Challa URI.jpeg" },
  { songName: "Jai Shri Ram", filePath: "Resources/Jai Shri Ram.mp3", coverPath: "Resources/Jai Shri Ram.jpg" },
  { songName: "Kar Har Maidaan Fateh", filePath: "Resources/Kar Har Maidaan Fateh.mp3", coverPath: "Resources/Kar Har Maidaan Fateh.jpeg" },
  { songName: "Prassthanam Title Track", filePath: "Resources/Prassthanam Title Track.mp3", coverPath: "Resources/Prassthanam Title Track.jpeg" },
  { songName: "Shoorveer 3", filePath: "Resources/Shoorveer 3.mp3", coverPath: "Resources/Shoorveer 3.jpeg" }
];

let audioElement = new Audio(songs[songIndex].filePath);

function loadSong(index) {
  audioElement.src = songs[index].filePath;
  currentSong.src = songs[index].coverPath;
  currentMusicTitle.textContent = songs[index].songName;
  currentTime.textContent = "0:00";
  progressBar.value = 0;
}

function playMusic() {
  audioElement.play();
  playBtn.src = "Resources/pause.png";
  playBtn.classList.add("playing");
  isPlaying = true;
}

function pauseMusic() {
  audioElement.pause();
  playBtn.src = "Resources/play.png";
  playBtn.classList.remove("playing");
  isPlaying = false;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playMusic();
});

previousBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playMusic();
});

audioElement.addEventListener("timeupdate", () => {
  if (audioElement.duration) {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
  }

  let mins = Math.floor(audioElement.currentTime / 60);
  let secs = Math.floor(audioElement.currentTime % 60);
  currentTime.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
});

progressBar.addEventListener("input", () => {
  if (audioElement.duration) {
    const seekTime = (progressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
  }
});

modeChangeBtn.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("light")) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    modeChangeBtn.src = "Resources/dark.png";
    modeChangeBtn.classList.remove("light");
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    modeChangeBtn.src = "Resources/light.png";
    modeChangeBtn.classList.add("light");
  }
});

songs.forEach((song, index) => {
  const songDiv = document.createElement("div");
  songDiv.classList.add("songs");
  songDiv.dataset.index = index;
  songDiv.innerHTML = `
    <img src="${song.coverPath}" alt="cover" />
    <h3>${song.songName}</h3>
  `;
  playlistDiv.appendChild(songDiv);
});

playlistDiv.addEventListener("click", (e) => {
  const songDiv = e.target.closest(".songs");
  if (songDiv) {
    songIndex = parseInt(songDiv.dataset.index);
    loadSong(songIndex);
    playMusic();
  }
});

loadSong(songIndex);
