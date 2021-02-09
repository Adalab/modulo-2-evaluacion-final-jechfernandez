'use strict';

//RETRIEVE ELEMENTS FROM HTML
const apiLink = 'http://api.tvmaze.com/search/shows?q=';
const noImageText = 'Image not found, sorry!';
const noImage = `https://via.placeholder.com/210x295/ffffff/666666/?text=${noImageText}`;
const formElement = document.querySelector ('.js-form');
const searchInputElement = document.querySelector ('.js-search-input');
const searchButtonElement = document.querySelector ('.js-search-button');
const listElement = document.querySelector ('.js-series-list');

//SERIES'S ARRAY
let series = [];
let favouriteSeries = [];

//PREVENT SUBMIT FORM
document
  .querySelector ('.js-search-button')
  .addEventListener ('click', function (event) {
    event.preventDefault ();
  });

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

//PAINT CARDS
function paintSeriesCards () {
  let htmlCode;
  for (const serie of series) {
    htmlCode += '<article class="main__card">';
    htmlCode += `<h3 class="main__card--title">${serie.show.name}</h3>`;
    if (serie.show.image === null) {
      htmlCode += `<img class="js-image main__card--img" src="${noImage}" alt="${serie.show.name}" />`;
    } else {
      htmlCode += `<img class="js-image main__card--img" src="${serie.show.image.medium}" alt="${serie.show.name}" />`;
    }
    htmlCode += '</li>';
    htmlCode += '</article>';
  }
  listElement.innerHTML = htmlCode;
}

getApisData ();

function enterKey (event) {
    if (event.key==='Enter') {
        paintSeriesCards();
    }
}

document.addEventListener('keyup', enterKey);