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

    generateDivChildren(arrayOfAww);
  };
}

function retrieveAPI(url) {
  let apiRequest = new XMLHttpRequest();

  apiRequest.addEventListener("load", requestListener());
  apiRequest.open("GET", url);
  apiRequest.send();

  return arrayOfAww;
}

function generateDivChildren(array) {
  console.log(array);
  for (let i=0; i<array.length; i++) {
    let previewDiv = document.createElement('div');

    previewDiv.className = "preview";
    previewDiv.innerHTML = array[i].data.title;
    console.log(previewDiv);

    wrapperDiv.appendChild(previewDiv);
  }
}

retrieveAPI('https://www.reddit.com/r/aww.json');
// generateDivChildren(arrayOfAww);
