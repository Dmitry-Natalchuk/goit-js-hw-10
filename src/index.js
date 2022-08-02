//Бібліотекі
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

import './css/styles.css';
import {fetchCountries} from './fetchCountries'


const input = document.querySelector("#search-box");
//Ul
const countryList = document.querySelector(".country-list");
//DIV
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;


input.addEventListener("input",debounce(onCountryInfo,DEBOUNCE_DELAY));

function onCountryInfo(event) {
    const inputTrim = event.target.value.trim()
    if(inputTrim === ""){
        countryList.innerHTML = ""
        countryInfo.innerHTML = ""
        return
    }
     return fetchCountries(inputTrim)
     .then(countries => renderCountryItem(countries))
     .catch(error => {
        console.log(error)
         Notify.failure('Oops, there is no country with that name');
    })
};


function renderCountryItem(countries){
    if(countries.length > 1) {
        const renderCountries = countries.map(({name,flags}) => {
           return `<li><img src="${flags.svg}" width="50" height ="50" /> ${name}</li>`
        }).join("")
        countryList.innerHTML = renderCountries
        countryInfo.innerHTML = ""
    }
    if(countries.length > 10) {
        countryList.innerHTML = ""
        countryInfo.innerHTML = ""
         Notify.info('Too many matches found. Please enter a more specific name.')
    }
    if(countries.length === 1) {
        const renderInfo = countries.map(({name,flags,capital,population,languages}) => {
            return `<li><img src="${flags.svg}" width="50" height ="50"> ${name}</li>
            <p> Capital: ${capital}</p>
            <p> Population: ${population}</p>
            <p> Languages: ${languages[0].name}</p>`
        }).join("");
        countryList.innerHTML = ""
        countryInfo.innerHTML = renderInfo
    }
}