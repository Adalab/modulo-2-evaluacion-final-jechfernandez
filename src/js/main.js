'use strict';

//RETRIEVE ELEMENTS FROM HTML
const apiLink = 'http://api.tvmaze.com/search/shows?q=';
const noImageText = 'Image not found, sorry!';
const noImage = `https://via.placeholder.com/210x295/ffffff/666666/?text=${noImageText}`;
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

    //PAINT IT DARLING
    htmlCode += `<li class="js-list-element${favClass}" id="${serie.show.id}">`;
    if (serie.show.officialSite === null) {
      htmlCode += `<h3 class="main__card--title">${serie.show.name}</h3>`;
    } else {
      htmlCode += '<h3 class="main__card--title"></h3>';
    //   htmlCode += `<a href="${serie.show.officialSite}" target="_blank" title="${serie.show.name} official site">${serie.show.name}</a>`;
    //   htmlCode += '</h3>';
    }
    if (serie.show.image === null) {
        htmlCode += `<img class="js-image main__card--img" src="${noImage}" alt="${serie.show.name}" />`;
      } else {
        htmlCode += `<img class="js-image main__card--img" src="${serie.show.image.medium}" alt="${serie.show.name}" />`;
      }
      
      htmlCode += '</li>';
  }
  htmlCode += '</ul>';
  const listElement = document.querySelector('.js-list');
  listElement.innerHTML = htmlCode;
}

//     if (serie.show.image === null) {
//       htmlCode += `<img class="js-image main__card--img" src="${noImage}" alt="${serie.show.name}" />`;
//     } else {
//       htmlCode += `<img class="js-image main__card--img" src="${serie.show.image.medium}" alt="${serie.show.name}" />`;
//     }
//     htmlCode += '</li>';
//     htmlCode += '</ul>';
//   }
//   listElement.innerHTML = htmlCode;
// }

getApisData ();

function enterKey (event) {
  if (event.key === 'Enter') {
    paintSeriesCards ();
  }
}

document.addEventListener ('keyup', enterKey);
