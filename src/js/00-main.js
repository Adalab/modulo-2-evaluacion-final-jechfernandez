'use strict';

//Retrieve elements from HTML
const apiLink = 'http://api.tvmaze.com/search/shows?q=';
const formElement = document.querySelector ('.js-form');
const searchInputElement = document.querySelector ('.js-search-input');
const searchButtonElement = document.querySelector ('.js-search-button');
const listElement = document.querySelector ('.js-series-list');
const logElement = document.querySelector('.js-log-favourites');

//Series' arrays
let series = [];
let favouriteSeries = [];

//Prevent submit form
function handleForm (ev) {
  ev.preventDefault ();
}

formElement.addEventListener ('submit', handleForm);

function handleLog (){
  for ( const favouriteSerie of favouriteSeries ){
    console.log(favouriteSerie.show.name);
    
  };
  // console.log(favouriteSeries);
};

logElement.addEventListener ('click', handleLog);