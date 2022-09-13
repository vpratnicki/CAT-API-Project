var catContainerEl = document.querySelector("#grid");
var getMediaButtonEl = document.querySelector("#media-buttons");
// console.log(getMediaButtonEl);
var generateFactsEl = document.querySelector("#generate-fact");
var factContainerEl = document.getElementById('random-cat-fact-container');


function fetchFacts(event) {
  event.preventDefault();
  console.log('You pressed the get fact button');

  fetch('https://catfact.ninja/fact?max_length=140')
  .then( function(responseObj) {
    if(!responseObj.ok) {
      console.log('The fetch was not successful');
      factContainerEl.textContent = 'The fetch was not successful';
    } else {
      console.log('responseObj is', responseObj);
      // var parsedBody = responseObj.json();
      return responseObj.json();
    }
  })
  .then( function(data) {
    console.log('data is', data)
    var theFact = data.fact;
    console.log('The fact is: ', theFact);
    factContainerEl.textContent = theFact;
  })
}


var getCatImages = function () {
 //display random images in a grid 
var requestUrl= `https://api.thecatapi.com/v1/images/search?limit=6&mime_types=jpg&api_key=live_XVBvacawr5DEpFchrnVEnA6U24e9Dq6sPNr0HgYPz4WBYlSMczHesXIoa76DsSPc`;
 fetch(requestUrl)
 .then((response) => {
   return response.json();
 })
.then((data) => {
  var imagesData = data;
  imagesData.map(function(imageData) {
    
    var image = document.createElement('img');
    //use the url to display the image
    image.src = `${imageData.url}`;
        
    var gridCell = document.createElement('div');
    gridCell.classList.add('col');
    gridCell.classList.add('col-lg');
    gridCell.appendChild(image)
      
    document.getElementById('grid').appendChild(gridCell);
    });
})
.catch(function (error) {
    alert('Unable to connect to The Cat API');
});
};

var getCatGifs = function () {
 //display random gifs in a grid 
 var requestUrl= `https://api.thecatapi.com/v1/images/search?limit=6&mime_types=gif&api_key=live_XVBvacawr5DEpFchrnVEnA6U24e9Dq6sPNr0HgYPz4WBYlSMczHesXIoa76DsSPc`;
 fetch(requestUrl)
 .then((response) => {
   return response.json();
 })
.then((data) => {
  var gifData = data;
  gifData.map(function(gifData) {
    
    var image = document.createElement('img');
    //use the url from the image object
    image.src = `${gifData.url}`;
        
    var gridCell = document.createElement('div');
    gridCell.classList.add('col');
    gridCell.classList.add('col-lg');
    gridCell.appendChild(image)
      
    document.getElementById('grid').appendChild(gridCell);
    
    });
})
.catch(function (error) {
    alert('Unable to connect to The Cat API');
});
};

var buttonClickHandler = function (event) {
  var mediaType = event.target.getAttribute("data-type");
  console.log(mediaType);

  if (mediaType === "img") {
    getCatImages();
  } else if (mediaType === "gif") {
    getCatGifs();
  } else {
    alert('Unable to find cats! They are napping.');
  }

  // clear old content
  catContainerEl.textContent = "";

}

function myCoolFunction() {
  // does something cool
}

getMediaButtonEl.addEventListener("click", buttonClickHandler);
// getGifsButtonEl.addEventListener("click", getCatGifs);
generateFactsEl.addEventListener("click", fetchFacts);
