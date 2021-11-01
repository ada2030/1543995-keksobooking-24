import {activateForm} from './form.js';
import {setAttributeOrRemoveAttribute} from './utils.js';

const addressInput = document.querySelector('#address');

// отрисовка карты после события load
const map = L.map('map-canvas');
map.on('load', activateForm);
map.setView({lat: 35.69399, lng: 139.76023}, 10);

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
    lat: 35.69399,
    lng: 139.76023,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

// изначальные координаты метки
let coordinates = {
  lat: 35.69399,
  lng: 139.76023,
};
addressInput.value = `${coordinates.lat}, ${coordinates.lng}`;
setAttributeOrRemoveAttribute(addressInput, 'set','value', `${coordinates.lat}, ${coordinates.lng}`);

// обработка события измениния координатов метки
mainMarker.on('moveend', (evt) => {
  coordinates = {
    lat: evt.target.getLatLng().lat.toFixed(5),
    lng: evt.target.getLatLng().lng.toFixed(5),
  };
  addressInput.value = `${coordinates.lat}, ${coordinates.lng}`;
});

// функция возвращения в исходное положение
const resetMapAndMarker = () => {
  mainMarker.setLatLng({
    lat: 35.69399,
    lng: 139.76023,
  });
  map.setView({
    lat: 35.69399, lng: 139.76023}, 10);
  map.closePopup();
};

export {map, resetMapAndMarker};


