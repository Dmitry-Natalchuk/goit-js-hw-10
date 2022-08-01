
function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    fetch(BASE_URL).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
}

export {fetchCountries}
//Приклад
/* fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }) */