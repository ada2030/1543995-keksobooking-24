import {activateForm} from './form.js';
import {appendData} from './markup.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';

const SIMILAR_ADVERT_COUNT = 10;
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const addressInput = document.querySelector('#address');
let coordinates = {
  lat: 35.69399,
  lng: 139.76023,
};
addressInput.setAttribute('value', `${coordinates.lat}, ${coordinates.lng}`);

// отрисовка карты после события load
map.on('load', activateForm);
map.setView({lat: coordinates.lat, lng: coordinates.lng}, 10);

// подтягивание ресурсов
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// замена иконки метки
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// опции основной метки
const mainMarker = L.marker(
  {
    lat: coordinates.lat,
    lng: coordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

// обработка события измениния координатов метки
mainMarker.on('moveend', (evt) => {
  coordinates = {
    lat: evt.target.getLatLng().lat.toFixed(5),
    lng: evt.target.getLatLng().lng.toFixed(5),
  };
  addressInput.value = `${coordinates.lat}, ${coordinates.lng}`;
});

// функция, которая рисует метки на карте
const paintMarker = (allData) => {
  markerGroup.clearLayers();
  allData
    .slice(0, SIMILAR_ADVERT_COUNT)
    .forEach(({author, offer, location}) => {
      const icon = L.icon({
        iconUrl: 'img/pin.svg',
        // Это же параметры плагина leaflet, я не могу их изменять, думаю тут вы не правы
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      });
      const marker = L.marker({
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: icon,
      });
      marker
        .addTo(markerGroup)
        .bindPopup(appendData(author, offer));
    });
};

// функция возвращения в исходное положение
const resetMapAndMarker = () => {
  getData('https://24.javascript.pages.academy/keksobooking/data', (allData) => {
    paintMarker(allData);
  }, showAlert);
  markerGroup.clearLayers();
  mainMarker.setLatLng({
    lat: coordinates.lat,
    lng: coordinates.lng,
  });
  map.setView({
    lat: 35.69399, lng: 139.76023}, 10);
  map.closePopup();
};

export {map, resetMapAndMarker, paintMarker};


