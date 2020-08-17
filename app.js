//getting all essential dom element 
const searchBtn = document.getElementById('search-btn');
const searchBox = document.getElementById('search-box');

const songName = document.getElementsByClassName('lyrics-name');
const authorName = document.getElementsByClassName('author-name');
const albumCoverImg = document.getElementsByClassName('album-cover-img');
const albumName = document.getElementsByClassName('album-name');

const searchDiv = document.getElementById('search-result-div');
const getLyricsBtn = document.getElementsByClassName('get-lyrics-btn');
const lyricsResultShow = document.getElementsByClassName('lyrics-result-show');

searchDiv.style.display = 'none';

//make search btn functional 
searchBtn.addEventListener('click', fetchApi);


//fetch data from server by user search value
async function fetchApi() {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${searchBox.value}`);
    const data = await response.json(); //make fetch data to global variable for easy access from all function
    if(data.error){
        alert(`Sorry, something goes wrong can't fetch from server`);
    }else{
        console.log(data);
        displayResult(data); // call display result function to show user search data
        getLyrics(data);
    }
    
}


// fetch lyrics by song title and artist name
async function fetchLyrics(artist, title, index) {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`); // fetching data 
    const data = await response.json(); // convert promise to json format 
    if (data.error) {
        alert('Sorry, no lyrics found for this song.'); // if lyrics not found then it throw a alert to user
    } else {
        lyricsResultShow[index].innerText = data.lyrics; // display lyrics result
        console.log(data);
    }
}


// displaying all search result
function displayResult(data) {
    searchDiv.style.display = 'block'; 
    for (let i = 0; i < songName.length; i++) {
        songName[i].innerText = data.data[i].title; // display lyrics name
        authorName[i].innerText = data.data[i].artist.name; // display album name
        albumCoverImg[i].src = data.data[i].album.cover; // display album cover pic
        albumName[i].innerText = data.data[i].album.title; //display song name
    }
}

// make get lyrics btn functional
function getLyrics(data){
    for (let i = 0; i < getLyricsBtn.length; i++) {
        const lyricsBtn = getLyricsBtn[i]; 
        lyricsBtn.addEventListener('click', () => { // event handler for get lyrics button
            const title = data.data[i].title; 
            const artist = data.data[i].artist.name;
            fetchLyrics(artist, title, i); // call fetch lyrics function with artist title and index parameter 
            console.log(i);
        });
    }
}
