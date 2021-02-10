function getApisData () {
  const searchValue = searchInputElement.value;
  fetch (apiLink + searchValue)
    .then (response => response.json ())
    .then (data => {
      series = data;
      paintSeriesCards ();
      paintFaved ();
      getFromLocalStorage ();
    });
}

searchButtonElement.addEventListener ('click', getApisData);

function enterKey (event) {
  if (event.key === 'Enter') {
    paintSeriesCards ();
  }
}

document.addEventListener ('keyup', enterKey);
