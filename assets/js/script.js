var catContainerEl = document.querySelector("#grid");
var getMediaButtonEl = document.querySelector("#media-buttons");
// console.log(getMediaButtonEl);
var generateFactsEl = document.querySelector("#generate-fact");
var factContainerEl = document.getElementById("random-cat-fact-container");

function fetchFacts(event) {
  event.preventDefault();
  console.log("You pressed the get fact button");

  fetch("https://catfact.ninja/fact?max_length=140")
    .then(function (responseObj) {
      if (!responseObj.ok) {
      }
      console.log("responseObj is", responseObj);
      // var parsedBody = responseObj.json();
      return responseObj.json();
    })
    .then(function (data) {
      console.log("data is", data);
      var theFact = data.fact;
      console.log("The fact is: ", theFact);
      factContainerEl.textContent = theFact;
    });
}

function getAndRenderMedia(mediaType) {
  var url = "https://api.thecatapi.com/v1/images/search";
  if (mediaType === "img") {
    url +=
      "?limit=6&mime_types=jpg&api_key=live_XVBvacawr5DEpFchrnVEnA6U24e9Dq6sPNr0HgYPz4WBYlSMczHesXIoa76DsSPc";
  } else {
    url +=
      "?limit=6&mime_types=gif&api_key=live_XVBvacawr5DEpFchrnVEnA6U24e9Dq6sPNr0HgYPz4WBYlSMczHesXIoa76DsSPc";
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; data.length; i++) {
        var current = data[i];
        if (current.url !== undefined) {
          var image = document.createElement("img");
          //use the url from the image object
          image.src = `${current.url}`;

          var gridCell = document.createElement("div");
          gridCell.classList.add("col");
          gridCell.classList.add("col-lg");
          gridCell.appendChild(image);

          document.getElementById("grid").appendChild(gridCell);
        }
      }
    });
}

var buttonClickHandler = function (event) {
  event.preventDefault();
  if (event.target.classList.contains("btn-media")) {
    var clickType = event.target.getAttribute("data-type");
    getAndRenderMedia(clickType);
  }
};

function setFavoritesInStorage(item) {
  var favorites = getFavoritesFromStorage();
  favorites.push(item);
  localStorage.setItem('favs', JSON.stringify(favorites))
}

function getFavoritesFromStorage() {
  var favorites = JSON.parse(localStorage.getItem('favs'));
  if (!favorites) {
    return []
  }
  return favorites;
}

getMediaButtonEl.addEventListener("click", buttonClickHandler);
generateFactsEl.addEventListener("click", fetchFacts);
