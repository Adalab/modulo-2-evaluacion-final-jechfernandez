'use strict';

function paintSeriesCards () {
  let htmlCode = '<ul class="main__list">';
  let favClass;
  for (const serie of series) {
    const isFaved = favouriteSeries.find (favSerie => {
      return favSerie.show.id === serie.show.id;
    });
    if (isFaved === undefined) {
      favClass = '';
    } else {
      favClass = ' card--favourite';
    }

    htmlCode += `<li class="main__list--item js-list-element${favClass}" id="${serie.show.id}">`;
    htmlCode += `<h3 class="main__card--title">${serie.show.name}</h3>`;
    htmlCode += `<p>${serie.show.schedule.time}</p>`;

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

//Paint favourites
function paintFaved (ev) {
  for (let i = 0; i < series.length; i++) {
    const currentSerie = series[i];
    let isFaved = false;
    for (let j = 0; j < favouriteSeries.length; j++) {
      if (favouriteSeries[j].show.id == currentSerie.show.id) {
        isFaved = true;
      }
    }
    if (!isFaved && currentSerie.show.id == parseInt (ev)) {
      //   console.log (currentSerie);
      favouriteSeries.push (currentSerie);

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
  setInLocalStorage ();
  paintSeriesCards ();
}
document.addEventListener ('click', function (e) {
  if (e.target.parentElement.classList[0] == 'main__list--item') {
    paintFaved (e.target.parentElement.id);
  }
});
