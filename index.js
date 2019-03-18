const songForm = document.querySelector('#songForm');
const songInput = document.querySelector('#song-input');
const songList = document.querySelector('#songList');




 songForm.addEventListener('submit', newSong);
 songList.addEventListener('click', removeSong);
 document.addEventListener('DOMContentLoaded', loadSong);



function newSong(e){
  e.preventDefault();
    
  const song = songInput.value;
  
  if(song === ''){
    alertMessage('Please insert song','#e74c3c');
  } else {
    addSongToList(song);
    saveToLS(song);
    alertMessage('Song add','#2ecc71');
    songForm.reset();
  }
}

function addSongToList(song){
 const removeBtn = document.createElement('a');
  removeBtn.className = 'remove-song';
  removeBtn.textContent = 'X';
  
  const li = document.createElement('li');
  li.textContent = song;
  li.appendChild(removeBtn);  
  
  songList.appendChild(li);
}

function removeSong(element){
 if(element.target.classList.contains('remove-song')){
  element.target.parentElement.remove();
  removeFromLS(element.target.parentElement.textContent.slice(0,-1));
  alertMessage('Song removed','#e74c3c');
 }
}

function alertMessage(message,color){
  const paragraph = document.createElement('p');
  paragraph.className = 'message-p';
  paragraph.style.padding = '5px 5px';  
  paragraph.style.backgroundColor = color;
  paragraph.style.color = '#fff';
  paragraph.textContent = message;
  songForm.insertAdjacentElement('beforebegin',paragraph);
  setTimeout(()=>{
   document.querySelector('.message-p').remove();
  },2000);
}

// localStorage
function loadSong(){
  let songs = loadLS();
  songs.forEach(element => {
   addSongToList(element);
  });
 }

function loadLS(){
 let songs;
 if(localStorage.getItem('song') === null){
  songs = [];
 }else{
  songs = JSON.parse(localStorage.getItem('song'));
 }
 return songs;
}

function saveToLS(song){
 let songs = loadLS();
 songs.push(song);
 localStorage.setItem('song',JSON.stringify(songs));
}

function removeFromLS(song){
 let songs = loadLS();
 songs.forEach((sg,index) => {
  if(sg === song){
   songs.splice(index,1);
  }
 });
 localStorage.setItem('song',JSON.stringify(songs));
} 




