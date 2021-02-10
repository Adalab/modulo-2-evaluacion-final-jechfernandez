"use strict";const apiLink="http://api.tvmaze.com/search/shows?q=",formElement=document.querySelector(".js-form"),searchInputElement=document.querySelector(".js-search-input"),searchButtonElement=document.querySelector(".js-search-button"),listElement=document.querySelector(".js-series-list");let series=[],favouriteSeries=[];function handleForm(e){e.preventDefault()}function getApisData(){const e=searchInputElement.value;fetch(apiLink+e).then(e=>e.json()).then(e=>{series=e,paintSeriesCards(),paintFaved(),getFromLocalStorage()})}function enterKey(e){"Enter"===e.key&&paintSeriesCards()}function paintSeriesCards(){let e,i='<ul class="main__list">';for(const t of series){e=void 0===favouriteSeries.find(e=>e.show.id===t.show.id)?"":" card--favourite",i+=`<li class="main__list--item js-list-element${e}" id="${t.show.id}">`,i+=`<h3 class="main__card--title">${t.show.name}</h3>`,null===t.show.image?i+=`<img class="js-image main__card--img" src="./assets/images/no-image-found.png" alt="${t.show.name}" />`:i+=`<img class="js-image main__card--img" src="${t.show.image.medium}" alt="${t.show.name}" />`,i+="</li>"}i+="</ul>";document.querySelector(".js-list").innerHTML=i}function paintFaved(e){for(let i=0;i<series.length;i++){const t=series[i];let a=!1;for(let e=0;e<favouriteSeries.length;e++)favouriteSeries[e].show.id==t.show.id&&(a=!0);if(!a&&t.show.id==parseInt(e)){console.log(t),favouriteSeries.push(t);let e='<ul class="main__list--faved">';for(const i of favouriteSeries)e+=`<li class="main__list--item main__list--item-faved" id="${i.show.id}">`,e+=`<h3 class="main__card--title-faved">${i.show.name}</h3>`,null===i.show.image?e+=`<img class="js-image main__card--img" src="./assets/images/no-image-found.png" alt="${i.show.name}" />`:e+=`<img class="js-image main__card--img" src="${i.show.image.medium}" alt="${i.show.name}" />`,e+="</li>";e+="</ul>";document.querySelector(".main__container--faved").innerHTML=e}}setInLocalStorage(),paintSeriesCards()}function setInLocalStorage(){localStorage.setItem("localFavourites",JSON.stringify(favouriteSeries))}function getFromLocalStorage(){const e=localStorage.getItem("localFavourites");if(null!==e){favouriteSeries=JSON.parse(e);let i='<ul class="main__list--faved">';for(const e of favouriteSeries)i+=`<li class="main__list--item main__list--item-faved" id="${e.show.id}">`,i+=`<h3 class="main__card--title-faved">${e.show.name}</h3>`,null===e.show.image?i+=`<img class="js-image main__card--img" src="./assets/images/no-image-found.png" alt="${e.show.name}" />`:i+=`<img class="js-image main__card--img" src="${e.show.image.medium}" alt="${e.show.name}" />`,i+="</li>";i+="</ul>";document.querySelector(".main__container--faved").innerHTML=i}}formElement.addEventListener("submit",handleForm),searchButtonElement.addEventListener("click",getApisData),document.addEventListener("keyup",enterKey),getApisData(),document.addEventListener("click",(function(e){"main__list--item"==e.target.parentElement.classList[0]&&paintFaved(e.target.parentElement.id)})),getFromLocalStorage(),paintFaved();