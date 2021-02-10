'use strict';

//RETRIEVE ELEMENTS FROM HTML
const apiLink = 'http://api.tvmaze.com/search/shows?q=';
const formElement = document.querySelector ('.js-form');
const searchInputElement = document.querySelector ('.js-search-input');
const searchButtonElement = document.querySelector ('.js-search-button');
const listElement = document.querySelector ('.js-series-list');
// const listFavouriteElement = document.querySelector ('.main__list--item');

//SERIES'S ARRAYS
let series = [];
let favouriteSeries = [];

//PREVENT SUBMIT FORM
function handleForm (ev) {
  ev.preventDefault ();
}

formElement.addEventListener ('submit', handleForm);

//FETCH DATA FROM API
function getApisData () {
  const searchValue = searchInputElement.value;
  fetch (apiLink + searchValue)
    .then (response => response.json ())
    .then (data => {
      series = data;
      paintSeriesCards ();
    });
}

searchButtonElement.addEventListener ('click', getApisData);

function enterKey (event) {
  if (event.key === 'Enter') {
    paintSeriesCards ();
  }
}

document.addEventListener ('keyup', enterKey);

//PAINT CARDS
function paintSeriesCards () {
  let htmlCode = '<ul class="main__list">';
  let favClass;
  for (const serie of series) {
    const isFaved = favouriteSeries.find (
      favSerie => favSerie.show.id === serie.show.id
    );
    if (isFaved === undefined) {
      favClass = '';
    } else {
      favClass = 'card--favourite';
    }

    htmlCode += `<li class="main__list--item${favClass}" id="${serie.show.id}">`;
    htmlCode += `<h3 class="main__card--title">${serie.show.name}</h3>`;

    if (serie.show.image === null) {
      htmlCode += `<img class="js-image main__card--img" src="./assets/images/no-image-found.png" alt="${serie.show.name}" />`;
    } else {
      htmlCode += `<img class="js-image main__card--img" src="${serie.show.image.medium}" alt="${serie.show.name}" />`;
    }

    htmlCode += '</li>';
  }
  htmlCode += '</ul>';
  const listElement = document.querySelector ('.js-list');
  listElement.innerHTML = htmlCode;
}
getApisData ();

//PAINT FAVOURITES
function paintFaved (ev) {
  for (let i = 0; i < series.length; i++) {
    const currentSerie = series[i];
    let isFaved = false;
    for (let j = 0; j < favouriteSeries.length; j++) {
      if (favouriteSeries[j] == currentSerie) {
        isFaved = true;
      }
    }
    if (!isFaved && currentSerie.show.id == ev) {
      console.log (currentSerie);
      favouriteSeries.push (currentSerie);

      let htmlCode = '<ul class="main__list">';
      for (const serie of favouriteSeries) {
        htmlCode += `<li class="main__list--item" id="${serie.show.id}">`;
        htmlCode += `<h3 class="main__card--title">${serie.show.name}</h3>`;

        if (serie.show.image === null) {
          htmlCode += `<img class="js-image main__card--img" src="./assets/images/no-image-found.png" alt="${serie.show.name}" />`;
        } else {
          htmlCode += `<img class="js-image main__card--img" src="${serie.show.image.medium}" alt="${serie.show.name}" />`;
        }

        htmlCode += '</li>';
      }
      htmlCode += '</ul>';
      const listElement = document.querySelector ('.main__container--faved');
      listElement.innerHTML = htmlCode;
    }
  }
}
document.addEventListener ('click', function (e) {
  if (e.target.parentElement.classList[0] == 'main__list--item') {
    paintFaved (e.target.parentElement.id);
  }
});

//LOCAL STORAGE

function setInLocalStorage () {
  localStorage.setItem ('localFavourites', JSON.stringify (favouriteSeries));
}

function getFromLocalStorage () {
  const localStorageFavourites = localStorage.getItem ('localFavourites');
  if (localStorageFavourites !== null) {
    favouriteSeries = JSON.stringify (localStorageFavourites);
    paintFaved ();
    
  }
}

getFromLocalStorage ();
