
/* function fetchCountries(name) {
  const BASE_URL = "https://restcountries.com/v3.1/name";
  fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(response => {
      if(!response.ok) {
          throw new Error(response.status);
      }
      return response.json();
  })
} */
 export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .catch(error => console.log(error));
} 


//Приклад
/* fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }) */