//Бібліотекі
import Debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

import './css/styles.css';


const input = document.querySelector("#search-box");
//Ul
const countryList = document.querySelector(".country-list");
//DIV
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;