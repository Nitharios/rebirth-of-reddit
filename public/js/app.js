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

function generateDivChildren(array) {
  for (let i=1; i<5; i++) {
    let innerWrapper = document.createElement('div');
    let imagePreview = document.createElement('img');
    let titleDiv = document.createElement('div');
    let statsDiv = document.createElement('div');

    innerWrapper.className = "innerWrapper";
    titleDiv.className = "titleDiv";
    imagePreview.className = "imagePreview";
    imagePreview.src = array[i].data.preview.images[0].source.url;
    titleDiv.innerHTML = array[i].data.title; 
    statsDiv.innerHTML = array[i].data.author + ' ' + 
                         new Date(array[i].data.created*1000) + ' ' +
                         array[i].data.score + ' ' + 
                         array[i].data.num_comments;

    wrapperDiv.appendChild(innerWrapper);
    innerWrapper.appendChild(imagePreview);
    innerWrapper.appendChild(titleDiv);
    innerWrapper.appendChild(statsDiv);
  }
}

retrieveAPI('https://www.reddit.com/r/aww.json');
// generateDivChildren(arrayOfAww);
