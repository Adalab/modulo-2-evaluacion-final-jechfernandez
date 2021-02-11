'use strict';

//Retrieve elements from HTML
const apiLink = '//api.tvmaze.com/search/shows?q=';
const formElement = document.querySelector ('.js-form');
const searchInputElement = document.querySelector ('.js-search-input');
const searchButtonElement = document.querySelector ('.js-search-button');
const listElement = document.querySelector ('.js-series-list');

//Series' arrays
let series = [];
let favouriteSeries = [];

//Prevent submit form
function handleForm (ev) {
  ev.preventDefault ();
}

formElement.addEventListener ('submit', handleForm);
