import {getData} from './api.js';
import {showAlert} from './utils.js';
import {paintMarker} from './map.js';
import {changeFilters} from './filter.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;
getData('https://24.javascript.pages.academy/keksobooking/data', (allData) => {
  paintMarker(allData);
  changeFilters(debounce(
    () => paintMarker(allData),
    RERENDER_DELAY,
  ));
}, showAlert);
