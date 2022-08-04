//Бібліотекі
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

import './css/styles.css';
import { fetchCountries } from "./fetchCountries";

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function infoAlert() {
    Notify.info("Too many matches found. Please enter a more specific name.");
    }
    
function wrongAlert() {
    Notify.failure("Oops, there is no country with that name");
    }

function onInput() {
  const name = input.value.trim();
  if (name === "") {
    return (countryList.innerHTML = ""), (countryInfo.innerHTML = "");
  /*   countryInfo.innerHTML = "";
    countryList.innerHTML = "";
    return */
  }

  fetchCountries(name)
    .then(country => {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      if (country.length === 1) {
        countryInfo.insertAdjacentHTML("beforeend", newCountryInfo(country));
      }else if (country.length >= 10) {
        infoAlert()
      }else {
        countryList.insertAdjacentHTML("beforeend", newCountryList(country));
      }
    })
    .catch(wrongAlert);
}

function newCountryList(country) {
  const layoutList = country
    .map(({ name, flags }) => {
      const layout = `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="${name.official}">
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
      return layout;
    })
    .join("");
  return layoutList;
}

function newCountryInfo(country) {
  const layoutInfo = country
    .map(({ name, flags, capital, population, languages }) => {
      const layout = `
        <ul class="country-info__list">
            <li class="country-info__item">
              <img class="country-info__flag" src="${flags.svg}" alt=" ${name.official}">
                <h2 class="country-info__item--name">${name.official}</h2>
            </li>
            <li class="country-info__item">
                <span class="country-info__categories">Capital: </span>${capital}
            </li>
            <li class="country-info__item">
                <span class="country-info__categories">Population: </span>${population}
            </li>
            <li class="country-info__item">
                 <span class="country-info__categories">Languages: </span>${Object.values(
              languages,
            ).join(", ")}
            </li>
        </ul>
        `;
      return layout;
    })
    .join("");
  return layoutInfo;
}