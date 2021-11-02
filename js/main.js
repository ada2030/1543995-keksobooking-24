import './map.js';
import './markup.js';
import './form.js';
import {map} from './map.js';
import {getData} from './api.js';
import {getError} from './utils.js';
import {appendData} from './markup.js';

// функция, которая рисует метки на карте
const paintMarker = (allData) => {
  allData.forEach((data) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });
    const marker = L.marker({
      lat: data.location.lat,
      lng: data.location.lng,
    },
    {
      icon: icon,
    });
    marker
      .addTo(map)
      .bindPopup(appendData(data));
  });
};

getData(paintMarker, getError);
