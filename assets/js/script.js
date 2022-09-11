var catContainerEl = document.querySelector("#grid");
var getMediaButtonEl = document.querySelector("#media");

var getCatImages = function () {
 //display random images in a grid 
var requestUrl= `https://api.thecatapi.com/v1/images/search?limit=6&api_key=live_XVBvacawr5DEpFchrnVEnA6U24e9Dq6sPNr0HgYPz4WBYlSMczHesXIoa76DsSPc`;
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

  if ("data-type" === "img") {
    getCatImages(mediaType);
  } else if ("data-type" === "img") {
    getCatGifs(mediaType);
  } else {
    alert('Unable to find cats! They are napping.');
  }

  // clear old content
  catContainerEl.textContent = "";

}

getMediaButtonEl.addEventListener("click", buttonClickHandler);
// getGifsButtonEl.addEventListener("click", getCatGifs);