const selectRef = document.getElementById('selectCity');

async function loadCities(url) {
  let result = await fetch(url).then((response) => response.json());

  result.map((item) => {
    let opti = document.createElement('option');
    opti.innerHTML = `${item.city}`;
    selectRef.append(opti);
  });
}
loadCities('https://rikdeadok.github.io/test-cities/cities.json');
