'use strict';

//RETRIEVE ELEMENTS FROM HTML
const apiLink = 'http://api.tvmaze.com/search/shows?q=';
const formElement = document.querySelector ('.js-form');
const searchInputElement = document.querySelector ('.js-search-input');
const searchButtonElement = document.querySelector ('.js-search-button');
const listElement = document.querySelector ('.js-list');

//SERIES'S ARRAY
let series = [];

//PREVENT SUBMIT FORM
document.querySelector(".js-search-button").addEventListener("click",
    function (event) {
    event.preventDefault()
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

function paintSeriesCards() {

}
