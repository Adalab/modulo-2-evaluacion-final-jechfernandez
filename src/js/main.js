'use strict';

//RETRIEVE ELEMENTS FROM HTML
const apiLink = 'http://api.tvmaze.com/search/shows?q=';
const formElement = document.querySelector ('.js-form');
const searchInputElement = document.querySelector ('.js-search-input');
const searchButtonElement = document.querySelector ('.js-search-button');
const listElement = document.querySelector ('.js-series-list');

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
      console.log ('series');
      series = data;
      paintSeriesCards ();
    });
}

searchButtonElement.addEventListener ('click', getApisData);

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

function enterKey (event) {
  if (event.key === 'Enter') {
    paintSeriesCards ();
  }
}

document.addEventListener ('keyup', enterKey);
