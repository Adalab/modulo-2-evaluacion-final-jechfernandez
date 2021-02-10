function setInLocalStorage () {
  localStorage.setItem ('localFavourites', JSON.stringify (favouriteSeries));
}

function getFromLocalStorage () {
  const localStorageFavourites = localStorage.getItem ('localFavourites');
  if (localStorageFavourites !== null) {
    favouriteSeries = JSON.parse (localStorageFavourites);
    //paintFaved ();
    let htmlCode = '<ul class="main__list--faved">';
    for (const serie of favouriteSeries) {
      htmlCode += `<li class="main__list--item main__list--item-faved" id="${serie.show.id}">`;
      htmlCode += `<h3 class="main__card--title-faved">${serie.show.name}</h3>`;

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

getFromLocalStorage ();
paintFaved ();
