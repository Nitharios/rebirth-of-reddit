// jshint esversion:6

/*
JSON DOC
{data: 
  children:
    Array[0] [{
      data: {
        preview,
        thumbnail,
        title,
        url
      }
    }]
*/

console.log('Sanity Check: Rebirth of Reddit');

retrieveAPI('https://www.reddit.com/r/aww.json');

function requestListener() {
  return function() {
    let parsedDocument = JSON.parse(this.responseText);
  
    console.log(parsedDocument);
  
    return parsedDocument;
  };
}

function retrieveAPI(url) {
  let apiRequest = new XMLHttpRequest();

  apiRequest.addEventListener("load", requestListener());
  apiRequest.open("GET", url);
  apiRequest.send();
}
