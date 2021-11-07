/* jshint esversion:6 */

const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//song titles
const songs=['Ranjha', 'Raataan-Lambiyan','Humraah'];

//keep track of songs
let songIndex=2;

//initially load song info
loadSong(songs[songIndex]);

//update song details
function loadSong(song){
  title.innerText=song;
  audio.src=`songs/${song}.mp3`;
  cover.src=`images/${song}.jpg`;
}

function playSong(){
  musicContainer.classList.add('play');
  playBtn.querySelector('span.glyphicon').classList.remove('glyphicon-play');
  playBtn.querySelector('span.glyphicon').classList.add('glyphicon-pause');
  audio.play();
}

function pauseSong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('span.glyphicon').classList.remove('glyphicon-pause');
  playBtn.querySelector('span.glyphicon').classList.add('glyphicon-play');
  audio.pause();
}

function prevSong(){
  songIndex--;
  if(songIndex<0){
    songIndex=songs.length-1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(){
  songIndex++;
  if(songIndex>songs.length-1){
    songIndex=0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e){
  const {duration,currentTime}=e.srcElement;
  console.log(e.srcElement.duration);
  const progressPrecent = (currentTime / duration) * 100;
  progress.style.width=`${progressPrecent}%`;
}

function setProgress(e){
  const width=this.clientWidth;
  const clickX=e.offsetX;
  const duration=audio.duration;

  audio.currentTime=(clickX/width)*duration;
}


//event listener
playBtn.addEventListener('click', ()=>{
  const isPlaying = musicContainer.classList.contains('play');
  if(isPlaying){
    pauseSong();
  }
    else{
    playSong();
  }
});

//change song

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended',nextSong());
