// jshint esversion:6
console.log('Sanity Check: Rebirth of Reddit');

/*
JSON DOC
{data: 
  children:
    Array[0] [{
      data: {
        preview {
          images: Array[1]
          },
        thumbnail: someLink,
        title: /r/Some String,
        url: anotherLink
      }
    }]
*/

// Will store array of data retrieve from API
let arrayOfAww = [];
let arrayInAww = {};
let wrapperDiv = document.getElementById("wrapper");
let nav_random = document.getElementById("nav_random");
let nav_boards = document.getElementById("nav_boards");
let nav_getapp = document.getElementById("nav_getapp");

nav_random.addEventListener("click", randomSubRGen("https://www.reddit.com/r/Persona5.json"));
nav_boards.addEventListener("click", randomSubRGen("https://www.reddit.com/r/CryptoMarkets.json"));
nav_getapp.addEventListener("click", randomSubRGen("https://www.reddit.com/r/apps.json"));

// Need to build a function that grabs the data from the Array in the JSON object
function requestListener() {
  return function() {
    let parsedDocument = JSON.parse(this.responseText).data.children;
    arrayOfAww = parsedDocument;
    console.log(arrayOfAww);
    generateDivChildren(arrayOfAww);
  };
}

function retrieveAPI(url) {
  let apiRequest = new XMLHttpRequest();

  apiRequest.addEventListener("load", requestListener());
  apiRequest.open("GET", url);
  apiRequest.send();
}

function randomSubRGen(url) {
  return function() {
    wrapperDiv.innerHTML = "";
    return retrieveAPI(url);
  };
}

function generateDivChildren(array) {
  // generates blocks for X number of links
  for (let i=1; i<5; i++) {
    let innerWrapper = document.createElement('div');
    let imagePreview = document.createElement('div');
    let titleDiv = document.createElement('div');
    let statsDiv = document.createElement('div');
    let currentElement = array[i].data;
    let currentElementImage = currentElement.preview.images[0].source.url;
    let redditLogo = 'url("http://www.doomsteaddiner.net/blog/wp-content/uploads/2015/10/reddit-logo.png")';

    innerWrapper.className = "innerWrapper";
    titleDiv.className = "titleDiv";
    imagePreview.className = "imagePreview";
    statsDiv.className = "statsDiv";

    if (!currentElement.preview || currentElementImage.match(/.(png|jpeg|gif)/g)) {
      imagePreview.style.backgroundImage = redditLogo;
    } else {
      imagePreview.style.backgroundImage = `url("${currentElementImage}")`;
    }
    
    titleDiv.innerHTML = (currentElement.title); 
    statsDiv.innerHTML = currentElement.author + ' ' + 
                         new Date(currentElement.created*1000) + ' ' +
                         currentElement.score + ' ' + 
                         currentElement.num_comments;

    wrapperDiv.appendChild(innerWrapper);
    innerWrapper.appendChild(imagePreview);
    innerWrapper.appendChild(titleDiv);
    innerWrapper.appendChild(statsDiv);
  }
}

retrieveAPI('https://www.reddit.com/r/aww.json');
// generateDivChildren(arrayOfAww);
