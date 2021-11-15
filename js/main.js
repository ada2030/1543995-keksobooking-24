import {getData} from './api.js';
import {paintMarker} from './map.js';
import {showAlert,debounce} from './utils.js';
import {changeFilters, deleteData} from './filter.js';
import './avatar.js';

const RERENDER_DELAY = 500;
getData('https://24.javascript.pages.academy/keksobooking/data', (allData) => {
  paintMarker(allData);
  changeFilters(debounce(
    () => paintMarker(deleteData(allData.slice())),
    RERENDER_DELAY,
  ));
}, showAlert);
