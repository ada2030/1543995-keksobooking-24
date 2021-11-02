import './map.js';
import './markup.js';
import './form.js';
import {getData} from './api.js';
import {getError} from './utils.js';
import {paintMarker} from './map.js';

getData('https://24.javascript.pages.academy/keksobooking/data', paintMarker, getError);
