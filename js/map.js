import {setAttribute} from './utils.js';
import {mainArray} from './data.js';
import {appendData} from './markup.js';
const randomData = mainArray;
const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .setView({
    lat: 35.69399,
    lng: 139.76023,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

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

let coordinates = {
  lat: 35.69399,
  lng: 139.76023,
};
addressInput.value = `${coordinates.lat}, ${coordinates.lng}`;
setAttribute(addressInput,'disabled', 'disabled');

mainMarker.on('moveend', (evt) => {
  coordinates = {
    lat: evt.target.getLatLng().lat.toFixed(5),
    lng: evt.target.getLatLng().lng.toFixed(5),
  };
  addressInput.value = `${coordinates.lat}, ${coordinates.lng}`;
});

randomData.forEach((data) => {
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

